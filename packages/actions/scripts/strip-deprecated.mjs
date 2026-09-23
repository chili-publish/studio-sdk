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

function referencedTypeName(node) {
    if (ts.isTypeReferenceNode(node)) {
        return node.typeName.getText();
    }

    // `extends Base` / `implements Base` in a heritage clause
    if (ts.isExpressionWithTypeArguments(node)) {
        return node.expression.getText();
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

function memberRange(member) {
    const list = ts.isHeritageClause(member) ? member.parent.heritageClauses : member.parent.types;
    return listElementRange(list, list.indexOf(member));
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
 * Drop every `@deprecated` declaration, plus whatever can no longer be written
 * without one, so GraFx Genie never sees those APIs.
 */
export function stripDeprecatedDeclarations(sourceText, fileName = 'file.d.ts') {
    const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const removed = new Set();
    const removedTypeNames = new Set();
    // Union/intersection members, heritage types and heritage clauses dropped on their own.
    const droppedMembers = new Set();

    function remove(declaration) {
        removed.add(declaration);
        const name = declaredTypeName(declaration);
        if (name) {
            removedTypeNames.add(name);
        }
    }

    // `VariableType.formattedText` dangles when either the member or the whole enum is gone.
    function isRemovedTypeName(name) {
        let prefix = '';
        for (const part of name.split('.')) {
            prefix = prefix ? `${prefix}.${part}` : part;
            if (removedTypeNames.has(prefix)) {
                return true;
            }
        }
        return false;
    }

    function collectDeprecated(node) {
        if (isStrippableDeclaration(node) && ts.getJSDocDeprecatedTag(node) != null) {
            remove(node);
            return;
        }

        ts.forEachChild(node, collectDeprecated);
    }

    /**
     * Climbs from a reference to a removed type until something can absorb the
     * loss. A union, intersection or heritage clause with other members left
     * drops just this one. Otherwise the nearest declaration goes, and if that
     * declared a type, references to it are dangling on the next pass.
     */
    function dropReference(reference) {
        let node = reference;

        while (node.parent) {
            const parent = node.parent;

            if (ts.isHeritageClause(parent)) {
                // Losing its base leaves the interface or class itself intact.
                droppedMembers.add(node);
                if (parent.types.every((type) => droppedMembers.has(type))) {
                    droppedMembers.add(parent);
                }
                return;
            }

            if (isCompositeTypeNode(parent)) {
                droppedMembers.add(node);
                if (!parent.types.every((type) => droppedMembers.has(type))) {
                    return;
                }
            } else if (isStrippableDeclaration(parent)) {
                // Never take a whole module down over one reference.
                if (!ts.isModuleDeclaration(parent)) {
                    remove(parent);
                }
                return;
            }

            node = parent;
        }
    }

    function collectDanglingReferences(node) {
        if (removed.has(node) || droppedMembers.has(node)) {
            return;
        }

        const name = referencedTypeName(node);
        if (name != null && isRemovedTypeName(name)) {
            dropReference(node);
            return;
        }

        ts.forEachChild(node, collectDanglingReferences);
    }

    collectDeprecated(sourceFile);

    let size;
    do {
        size = removed.size + droppedMembers.size;
        collectDanglingReferences(sourceFile);
    } while (removed.size + droppedMembers.size > size);

    return applyRemovals(sourceText, [...[...removed].map(removalRange), ...[...droppedMembers].map(memberRange)]);
}
