import ts from "typescript";
import fs from "fs";

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

        const commentRanges = ts.getLeadingCommentRanges(
            root.getFullText(),
            node.getFullStart());
        if (commentRanges?.length) {
            const commentStrings =
                commentRanges.map(r => root.getFullText().slice(r.pos, r.end));

            functionInfo.description = commentStrings;
        }

        output.functions.push(functionInfo);
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
    const program = ts.createProgram([fileName], {
        allowJs: true
    });
    const sourceFile = program.getSourceFile(fileName);

    const output = {
        functions: []
    };

    visit(sourceFile, sourceFile, output);

    var template = `

import { Frame, HasName, Layout, Variable, VariableValue } from 'grafx-studio-actions';
declare module 'grafx-studio-actions-helper' {
    global {
        <<GLOBALS>>
    }
}
`;

    const exports = output.functions.map(f => {
        const comments = f.description.map(str => str.split('\n')).flat().map(d => `
        ${d.trim()}`).join("");
        return `
        ${comments}
        function ${f.name}(${f.parameters.map(p => `${p.name}: ${p.type}`).join(", ")}): ${f.returnType};`;
    });

    template = template.replace("<<GLOBALS>>", exports.join(""));

    // Parse the source file
    const fileToFormat = ts.createSourceFile(
        'test.ts',
        template,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS
    );

    // Create a printer
    const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
        removeComments: false,

    });
    
    // format ts
    template = printer.printFile(fileToFormat);
    const outFileName = fileName.replace(".d.ts", ".monaco.d.ts");

    fs.writeFileSync(outFileName, template);

}