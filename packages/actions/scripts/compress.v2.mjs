import ts from "typescript";
import fs from "fs";

function visit(root, node, output) {
    if (ts.isFunctionDeclaration(node)) {
        const functionInfo = {
            name: node.name.escapedText,
            parameters: node.parameters.map(p => ({name: p.name.escapedText, type: p.type.getText()})),
            returnType: getType(node.type),
        };
        output.functions.push(functionInfo);
    } else if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
        const classInfo = {
            name: getType(root, node.name.escapedText),
            methods: [],
            properties: [],
        };
        for (const member of node.members) {
            if (ts.isMethodDeclaration(member)) {
                const methodInfo = {
                    name: member.name.escapedText,
                    parameters: member.parameters.map(p => ({name: p.name.escapedText, type: getType(root, p.type)})),
                    returnType: getType(root, member.type),
                };
                classInfo.methods.push(methodInfo);
            }else if(ts.isMethodSignature(member)){
                const methodInfo = {
                    name: member.name.escapedText,
                    parameters: member.parameters.map(p => ({name: p.name.escapedText, type: getType(p.type.getText(root))})),
                    returnType: getType(root, member.type),
                };
                classInfo.methods.push(methodInfo);
            }else if(ts.isPropertySignature(member)){
                const methodInfo = {
                    name: member.name.escapedText,
                    returnType: getType(root, member.type),
                };
                classInfo.properties.push(methodInfo);
            }
        }

        if (classInfo.methods.length == 0)
            delete classInfo.methods;
        if (classInfo.properties.length == 0)
            delete classInfo.properties;

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

            if (ts.isFunctionDeclaration(member)) {
            }else if(ts.isVariableStatement(member)){
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

        if (moduleInfo.fields.length > 0)
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

    fs.writeFileSync('out/output.json', JSON.stringify(output, null, 1));
}

parseFile("./out/Actions.d.ts");
