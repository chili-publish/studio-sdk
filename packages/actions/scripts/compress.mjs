import ts from "typescript";
import fs from "fs";

function visit(root, node, output) {
    if (node == null)
        return;
    if (ts.isFunctionDeclaration(node)) {
        const functionInfo = {
            n: node.name.escapedText,
            p: node.parameters.map(p => ({ name: p.name.escapedText, type: getType(root, p.type) })),
            r: getType(root, node.type),
        };
        if (functionInfo.p.length == 0)
            delete functionInfo.p;

        output.functions.push(functionInfo);
    } else if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
        const classInfo = {
            n: getType(root, node.name.escapedText),
            m: [],
            p: [],
        };
        for (const member of node.members) {
            if (ts.isMethodDeclaration(member)) {
                const methodInfo = {
                    n: member.name.escapedText,
                    p: member.parameters.map(p => ({ name: p.name.escapedText, type: getType(root, p.type) })),
                    r: getType(root, member.type),
                };
                classInfo.m.push(methodInfo);
            } else if (ts.isMethodSignature(member)) {
                const methodInfo = {
                    n: member.name.escapedText,
                    p: member.parameters.map(p => ({ name: p.name.escapedText, type: getType(p.type.getText(root)) })),
                    r: getType(root, member.type),
                };
                classInfo.m.push(methodInfo);
            } else if (ts.isPropertySignature(member)) {
                const methodInfo = {
                    n: member.name.escapedText,
                    r: getType(root, member.type),
                };
                classInfo.p.push(methodInfo);
            }
        }

        if (classInfo.m.length == 0)
            delete classInfo.m;
        if (classInfo.p.length == 0)
            delete classInfo.p;

        output.classes.push(classInfo);
    } else if (ts.isEnumDeclaration(node)) {
        const enumInfo = {
            n: getType(root, node.name.escapedText),
            v: node.members.map(m => m.name.escapedText),
        };
        output.enums.push(enumInfo);
    } else if (ts.isModuleDeclaration(node)) {

        const moduleInfo = {
            n: node.name.escapedText,
            f: []
        };

        for (const member of node.body.statements) {

            if (ts.isFunctionDeclaration(member)) {
            } else if (ts.isVariableStatement(member)) {
                for (const declaration of member.declarationList.declarations) {
                    if (ts.isIdentifier(declaration.name)) {
                        moduleInfo.f.push({
                            n: declaration.name.escapedText,
                            t: getType(root, declaration.type),
                        });
                    }
                }
            }
        }

        if (moduleInfo.f.length > 0)
            output.modules.push(moduleInfo);
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
    const program = ts.createProgram([fileName], { allowJs: true });
    const sourceFile = program.getSourceFile(fileName);

    const output = {
        functions: [],
        classes: [],
        enums: [],
        modules: [],
    };

    visit(sourceFile, sourceFile, output);

    const outFileName = fileName.replace(".d.ts", ".json");

    fs.writeFileSync(outFileName, JSON.stringify(output, null, 0));
}

parseFile("./out/Actions.d.ts");
parseFile("./out/ActionHelpers.d.ts");