import ts from "typescript";
import fs from "fs";

parseFile("./out/Actions.d.ts");
parseFile("./out/ActionHelpers.d.ts");

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
    // copy the file, appending .genie to the name
    fs.copyFileSync(fileName, fileName.replace(".d.ts", ".genie.d.ts"));
    
    const program = ts.createProgram([fileName], {
        allowJs: true
    });
    const sourceFile = program.getSourceFile(fileName);

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