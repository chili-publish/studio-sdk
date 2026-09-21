import ts from 'typescript';

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
    return ts.isTypeReferenceNode(typeNode) ? typeNode.typeName.getText() : null;
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

function enclosingRemovableDeclaration(node) {
    let current = node.parent;

    while (current && !isStrippableDeclaration(current)) {
        current = current.parent;
    }

    return current ?? null;
}

function applyRemovals(sourceText, ranges) {
    const merged = [];

    for (const range of [...ranges].sort((a, b) => a.start - b.start || a.end - b.end)) {
        const last = merged[merged.length - 1];
        if (last && range.start <= last.end) {
            last.end = Math.max(last.end, range.end);
        } else {
            merged.push({ start: range.start, end: range.end });
        }
    }

    let result = sourceText;

    for (let i = merged.length - 1; i >= 0; i--) {
        result = result.slice(0, merged[i].start) + result.slice(merged[i].end);
    }

    return result;
}

/**
 * Drop every `@deprecated` declaration (and union/intersection references to
 * removed types) so GraFx Genie never sees those APIs.
 */
export function stripDeprecatedDeclarations(sourceText, fileName = 'file.d.ts') {
    const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const ranges = [];
    const removedTypeNames = new Set();
    const prunedComposites = new Set();

    function collectDeprecated(node) {
        if (isStrippableDeclaration(node) && ts.getJSDocDeprecatedTag(node) != null) {
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
     *
     * Nested composites are recorded in `prunedComposites` so a later walk of
     * the same subtree does not treat a fully-collapsed inner union as a reason
     * to delete the outer declaration.
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
