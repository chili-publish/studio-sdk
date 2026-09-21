import ts from "typescript";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

if (isMainModule()) {
    parseFile("./out/Actions.d.ts");
    parseFile("./out/ActionHelpers.d.ts");
}

function isDeprecated(node) {
    return ts.getJSDocDeprecatedTag(node) != null;
}

function isStrippableDeclaration(node) {
    return (
        ts.isFunctionDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isMethodSignature(node) ||
        ts.isPropertyDeclaration(node) ||
        ts.isPropertySignature(node) ||
        ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node) ||
        ts.isEnumMember(node) ||
        ts.isVariableStatement(node) ||
        ts.isGetAccessorDeclaration(node) ||
        ts.isSetAccessorDeclaration(node) ||
        ts.isConstructorDeclaration(node) ||
        ts.isCallSignatureDeclaration(node) ||
        ts.isConstructSignatureDeclaration(node) ||
        ts.isIndexSignatureDeclaration(node) ||
        ts.isModuleDeclaration(node)
    );
}

function isCompositeTypeNode(node) {
    return ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node);
}

function unwrapParentheses(typeNode) {
    let current = typeNode;

    while (ts.isParenthesizedTypeNode(current)) {
        current = current.type;
    }

    return current;
}

function declaredTypeName(node) {
    if (ts.isEnumMember(node) && ts.isEnumDeclaration(node.parent) && node.parent.name && ts.isIdentifier(node.name)) {
        return `${node.parent.name.text}.${node.name.text}`;
    }

    if (
        node.name &&
        ts.isIdentifier(node.name) &&
        (ts.isInterfaceDeclaration(node) ||
            ts.isClassDeclaration(node) ||
            ts.isTypeAliasDeclaration(node) ||
            ts.isEnumDeclaration(node))
    ) {
        return node.name.text;
    }

    return null;
}

function typeNodeName(typeNode) {
    if (!ts.isTypeReferenceNode(typeNode)) {
        return null;
    }

    if (ts.isIdentifier(typeNode.typeName)) {
        return typeNode.typeName.text;
    }

    if (ts.isQualifiedName(typeNode.typeName)) {
        return typeNode.typeName.getText();
    }

    return null;
}

/**
 * Range covering one element of a delimited list, including the delimiter that
 * keeps it attached to its neighbours. Enum members and union/intersection
 * members hold their `,` / `|` outside the node, so dropping the node alone
 * leaves `a = 'a',, b = 'b'` or `= | | Kept` behind.
 */
function listElementRange(elements, index) {
    const element = elements[index];
    const previous = elements[index - 1];
    const next = elements[index + 1];

    if (!next) {
        // Last element: take the delimiter in front of it, plus whatever trails
        // the list such as an enum's dangling comma.
        return { start: previous ? previous.end : element.getFullStart(), end: elements.end };
    }

    if (previous) {
        // The delimiter in front also takes the doc comment sitting above.
        return { start: previous.end, end: element.end };
    }

    // First of several: nothing in front to take, so take the delimiter that
    // follows and leave a leading `|` where it is.
    return { start: element.getFullStart(), end: next.getFullStart() };
}

function removalRange(node) {
    if (ts.isEnumMember(node)) {
        const members = node.parent.members;
        return listElementRange(members, members.indexOf(node));
    }

    return { start: node.getFullStart(), end: node.end };
}

/**
 * Nearest ancestor that can be dropped on its own, used when a type collapses
 * to nothing and whatever declared it can no longer be expressed.
 */
function enclosingRemovableDeclaration(node) {
    let current = node.parent;

    while (current && !isStrippableDeclaration(current)) {
        current = current.parent;
    }

    return current ?? null;
}

function mergeRanges(ranges) {
    const sorted = [...ranges].sort((a, b) => a.start - b.start || a.end - b.end);
    const merged = [];

    for (const range of sorted) {
        const last = merged[merged.length - 1];
        if (last && range.start <= last.end) {
            last.end = Math.max(last.end, range.end);
        } else {
            merged.push({ start: range.start, end: range.end });
        }
    }

    return merged;
}

function applyRemovals(sourceText, ranges) {
    let result = sourceText;

    for (const range of mergeRanges(ranges).sort((a, b) => b.start - a.start)) {
        result = result.slice(0, range.start) + result.slice(range.end);
    }

    return result;
}

/**
 * Drop every `@deprecated` declaration (and union/intersection references to
 * removed types) so GraFx Genie never sees those APIs.
 */
export function stripDeprecatedDeclarations(sourceText, fileName = "file.d.ts") {
    const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const ranges = [];
    const removedTypeNames = new Set();
    const prunedComposites = new Set();

    function collectDeprecated(node) {
        if (isStrippableDeclaration(node) && isDeprecated(node)) {
            ranges.push(removalRange(node));
            const name = declaredTypeName(node);
            if (name) {
                removedTypeNames.add(name);
            }
            return;
        }

        ts.forEachChild(node, collectDeprecated);
    }

    /**
     * Drops the members that point at removed types. Returns true when nothing
     * is left, in which case the caller drops the composite itself rather than
     * leaving `type Legacy = ;` behind.
     */
    function pruneComposite(composite) {
        prunedComposites.add(composite);

        const doomed = composite.types.map((member) => {
            const inner = unwrapParentheses(member);

            if (isCompositeTypeNode(inner)) {
                return pruneComposite(inner);
            }

            const name = typeNodeName(inner);
            return name != null && removedTypeNames.has(name);
        });

        if (doomed.every(Boolean)) {
            return true;
        }

        doomed.forEach((remove, index) => {
            if (remove) {
                ranges.push(listElementRange(composite.types, index));
            }
        });

        return false;
    }

    function collectDanglingTypeRefs(node) {
        if (isCompositeTypeNode(node) && !prunedComposites.has(node) && pruneComposite(node)) {
            const declaration = enclosingRemovableDeclaration(node);
            if (declaration) {
                ranges.push(removalRange(declaration));
            }
        }

        ts.forEachChild(node, collectDanglingTypeRefs);
    }

    collectDeprecated(sourceFile);
    collectDanglingTypeRefs(sourceFile);

    return applyRemovals(sourceText, ranges);
}

function visit(root, node, output) {
    if (node == null)
        return;
    if (ts.isFunctionDeclaration(node)) {
        const functionInfo = {
            name: node.name.escapedText,
            parameters: node.parameters.map(p => ({
                name: p.name.escapedText,
                type: getType(root, p.type)
            })),
            returnType: getType(root, node.type),
        };
        output.functions.push(functionInfo);
    } else if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
        const classInfo = {
            name: getType(root, node.name.escapedText),
            methods: [],
            properties: [],
        };
        for (const member of node.members) {
            if (ts.isMethodSignature(member)) {
                const methodInfo = {
                    name: member.name.escapedText,
                    parameters: member.parameters.map(p => ({
                        name: p.name.escapedText,
                        type: getType(p.type.getText(root))
                    })),
                    returnType: getType(root, member.type),
                };
                classInfo.methods.push(methodInfo);
            } else if (ts.isPropertySignature(member)) {
                const methodInfo = {
                    name: member.name.escapedText,
                    returnType: getType(root, member.type),
                };
                classInfo.properties.push(methodInfo);
            }
        }

        output.classes.push(classInfo);
    } else if (ts.isEnumDeclaration(node)) {
        const enumInfo = {
            name: getType(root, node.name.escapedText),
            values: node.members.map(m => m.name.escapedText),
        };
        output.enums.push(enumInfo);
    } else if (ts.isModuleDeclaration(node)) {

        const moduleInfo = {
            name: node.name.escapedText,
            fields: []
        };

        for (const member of node.body.statements) {

            if (ts.isFunctionDeclaration(member)) {} else if (ts.isVariableStatement(member)) {
                for (const declaration of member.declarationList.declarations) {
                    if (ts.isIdentifier(declaration.name)) {
                        moduleInfo.fields.push({
                            name: declaration.name.escapedText,
                            type: getType(root, declaration.type),
                        });
                    }
                }
            }
        }
    }

    ts.forEachChild(node, (child) => visit(root, child, output));
}

function getType(root, type) {
    if (type == null)
        return null;

    if (typeof type == "string")
        return type;

    return type.getText(root);
}

function parseFile(fileName) {
    const sourceText = fs.readFileSync(fileName, "utf8");
    const stripped = stripDeprecatedDeclarations(sourceText, fileName);
    const genieFileName = fileName.replace(".d.ts", ".genie.d.ts");

    fs.writeFileSync(genieFileName, stripped);

    const sourceFile = ts.createSourceFile(fileName, stripped, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

    const output = {
        functions: [],
        classes: [],
        enums: [],
        modules: [],
    };

    visit(sourceFile, sourceFile, output);

    // recursive delete empty arrays and properties with null values
    function clean(obj) {
        for (const key in obj) {
            if (obj[key] == null)
                delete obj[key];
            else if (Array.isArray(obj[key])) {
                if (obj[key].length == 0)
                    delete obj[key];
                else
                    obj[key].forEach(clean);
            } else if (typeof obj[key] == "object") {
                clean(obj[key]);
            }
        }
    }

    // recursively rename properties to the first letter of their original name, take into account of arrays and objects
    function rename(obj) {
        if (Array.isArray(obj)) {
            // If the object is an array, map over it and apply this function to each element
            return obj.map(rename);
        } else if (typeof obj === 'object' && obj !== null) {
            // If the object is a non-array object, create a new object with renamed properties
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key.charAt(0), rename(value)])
            );
        } else {
            // If the object is not an array or object, return it unchanged
            return obj;
        }
    }

    clean(output);
    const minifiedOutput = rename(output);

    const outFileName = fileName.replace(".d.ts", ".json");

    fs.writeFileSync(outFileName, JSON.stringify(minifiedOutput, null, 0));
}

function isMainModule() {
    try {
        return path.resolve(fileURLToPath(import.meta.url)) === path.resolve(fs.realpathSync(process.argv[1]));
    } catch {
        return false;
    }
}
