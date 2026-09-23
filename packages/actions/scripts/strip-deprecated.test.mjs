import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { stripDeprecatedDeclarations } from './strip-deprecated.mjs';

const thisDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Stripping works on raw text ranges, so a mishandled separator can silently
 * produce something that no longer parses. Every case asserts the result is
 * still valid TypeScript.
 */
function assertParses(source, fileName = 'stripped.d.ts') {
    const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const host = {
        getSourceFile: (name) => (name === fileName ? sourceFile : undefined),
        getDefaultLibFileName: () => 'lib.d.ts',
        writeFile: () => {},
        getCurrentDirectory: () => '',
        getCanonicalFileName: (name) => name,
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => '\n',
        fileExists: (name) => name === fileName,
        readFile: (name) => (name === fileName ? source : undefined),
    };

    const program = ts.createProgram([fileName], { noResolve: true, noLib: true }, host);
    const errors = program.getSyntacticDiagnostics(sourceFile).map((diagnostic) => {
        const { line } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start);
        return `${line + 1}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')} — ${source.split('\n')[line]}`;
    });

    assert.deepEqual(errors, [], `${fileName} no longer parses after stripping`);
}

function strip(source, fileName = 'stripped.d.ts') {
    const result = stripDeprecatedDeclarations(source, fileName);
    assertParses(result, fileName);
    return result;
}

describe('stripDeprecatedDeclarations', () => {
    it('removes @deprecated properties, methods, enum members, and types', () => {
        const source = `
declare module 'grafx-studio-actions' {
    global {
        export interface ActionApi {
            frames: FramesController;
            /**
             * @deprecated Use \`studio.brandKit\` instead.
             */
            stylekit: BrandKit;
            brandKit: BrandKit;
        }

        export interface FrameMethods {
            setVisible(isVisible: boolean): void;
        }

        export interface VariableMethods {
            /**
             * @deprecated Use visibility conditions instead
             */
            setVisible(isVisible: boolean): void;
            setReadonly(value: boolean): void;
        }

        export enum VariableType {
            shortText = 'shortText',
            /**
             * @deprecated Use \`richText\` instead
             */
            formattedText = 'formattedText',
            richText = 'richText',
        }

        export type Variable =
            | ShortTextVariable
            /** Deprecated. Use \`RichTextVariable\` instead. */
            | FormattedTextVariable
            | RichTextVariable;

        /**
         * @deprecated Use \`RichTextVariable\` instead
         */
        export interface FormattedTextVariable {
            readonly type: VariableType.formattedText;
        }

        export interface RichTextVariable {
            readonly type: VariableType.richText;
        }

        export interface BaseVariable {
            /**
             * @deprecated the property will no longer be used
             */
            readonly isVisible: boolean;
            readonly isReadonly: boolean;
        }
    }
}
`;

        const result = strip(source);

        assert.equal(result.includes('stylekit'), false);
        assert.equal(result.includes('FormattedTextVariable'), false);
        assert.equal(result.includes('formattedText'), false);
        assert.equal(result.includes('@deprecated'), false);
        assert.match(result, /brandKit: BrandKit/);
        assert.match(result, /export interface FrameMethods[\s\S]*setVisible\(isVisible: boolean\): void/);
        assert.match(result, /setReadonly\(value: boolean\): void/);
        assert.equal(/interface VariableMethods[\s\S]*setVisible/.test(result), false);
        assert.match(result, /readonly isReadonly: boolean/);
        assert.equal(/readonly isVisible: boolean/.test(result), false);
        assert.match(result, /\| ShortTextVariable/);
        assert.match(result, /\| RichTextVariable/);
    });

    it('takes the separator along when removing the first member of a leading-pipe union', () => {
        const source = `
/** @deprecated Use \`Kept\` instead */
export interface Legacy { a: string; }
export interface Kept { b: string; }
export type Thing =
    | Legacy
    | Kept;
`;

        const result = strip(source);

        assert.equal(result.includes('Legacy'), false);
        assert.match(result, /export type Thing =\s*\| Kept;/);
    });

    it('removes the declaration when every member of a union or intersection is deprecated', () => {
        const union = strip(`
/** @deprecated */
export interface LegacyA { a: string; }
/** @deprecated */
export interface LegacyB { b: string; }
export type Legacy = LegacyA | LegacyB;
export interface Kept { c: string; }
`);

        assert.equal(union.includes('Legacy'), false);
        assert.match(union, /export interface Kept/);

        const intersection = strip(`
/** @deprecated */
export interface LegacyA { a: string; }
/** @deprecated */
export interface LegacyB { b: string; }
export type Legacy = LegacyA & LegacyB;
export interface Kept { c: string; }
`);

        assert.equal(intersection.includes('Legacy'), false);
        assert.match(intersection, /export interface Kept/);
    });

    it('removes the enum member separator so the survivors still parse', () => {
        const source = `
export enum Alone {
    /** @deprecated */
    only = 'only',
}

export enum Several {
    first = 'first',
    /** @deprecated */
    middle = 'middle',
    /** @deprecated */
    last = 'last',
}
`;

        const result = strip(source);

        assert.equal(/only|middle|last/.test(result), false);
        assert.match(result, /first = 'first'/);
    });

    it('keeps the survivors when a parenthesised union collapses', () => {
        const source = `
/** @deprecated */
export interface LegacyA { a: string; }
/** @deprecated */
export interface LegacyB { b: string; }
export type Thing = (LegacyA | LegacyB) | string;
`;

        const result = strip(source);

        assert.match(result, /export type Thing = string;/);
    });

    it('removes @deprecated call and construct signatures from a kept interface', () => {
        const source = `
export interface Api {
    /** @deprecated */
    (name: string): void;
    /** @deprecated */
    new (name: string): Api;
    kept(): void;
}
`;

        const result = strip(source);

        assert.equal(result.includes('name: string'), false);
        assert.match(result, /kept\(\): void/);
    });

    it('removes declarations that can no longer be written without a removed type', () => {
        const result = strip(`
/** @deprecated */
export interface Legacy { a: string; }
export function create(): Legacy;
export type Values = Legacy[];
export type Box = Array<Legacy>;
export interface Api {
    load(legacy: Legacy): void;
    readonly current: Legacy;
    kept(): void;
}
`);

        assert.equal(/Legacy|Values|Box|create|load|current/.test(result), false);
        assert.match(result, /export interface Api \{\s*kept\(\): void;\s*\}/);
    });

    it('follows removals through aliases and collapsed unions', () => {
        const result = strip(`
/** @deprecated */
export interface LegacyA { a: string; }
/** @deprecated */
export interface LegacyB { b: string; }
export type Legacy = LegacyA | LegacyB;
export type Legacies = Legacy[];
export type Thing = Legacy | string;
export interface Holder {
    all: Legacies;
    kept: string;
}
`);

        assert.equal(/Legac/.test(result), false);
        assert.match(result, /export type Thing = string;/);
        assert.match(result, /export interface Holder \{\s*kept: string;\s*\}/);
    });

    it('drops a removed base type from extends clauses and keeps the interface', () => {
        const result = strip(`
/** @deprecated */
export interface HasLegacyName { name: string; }
export interface HasId { id: string; }
export interface Frame extends HasLegacyName { visible: boolean; }
export interface Layout extends HasLegacyName, HasId { width: number; }
`);

        assert.equal(result.includes('HasLegacyName'), false);
        assert.match(result, /export interface Frame \{ visible: boolean; \}/);
        assert.match(result, /export interface Layout extends HasId \{ width: number; \}/);
    });

    it('drops references to members of a removed enum', () => {
        const result = strip(`
/** @deprecated */
export enum LegacyType { a = 'a', b = 'b' }
export interface Thing {
    readonly type: LegacyType.a;
    readonly name: string;
}
`);

        assert.equal(result.includes('LegacyType'), false);
        assert.match(result, /readonly name: string;/);
    });

    it('removes future @deprecated helper functions while keeping the rest', () => {
        const source = `
/**
 * Gets a number variable.
 */
function getNumberVariable(name: string): NumberVariable {}

/**
 * @deprecated Use visibility conditions instead
 */
function setVariableVisible(name: string, visibility: boolean) {}

/**
 * @deprecated
 */
function getVariableIsVisible(name: string): boolean {}

function copyVariableValueFromTo(fromName: string, toName: string) {}
`;

        const result = strip(source);

        assert.match(result, /function getNumberVariable/);
        assert.match(result, /function copyVariableValueFromTo/);
        assert.equal(result.includes('setVariableVisible'), false);
        assert.equal(result.includes('getVariableIsVisible'), false);
        assert.equal(result.includes('@deprecated'), false);
    });

    it('strips current @deprecated helpers from ActionHelpers.ts', () => {
        const source = fs.readFileSync(path.join(thisDir, '../src/ActionHelpers.ts'), 'utf8');
        const result = strip(source, 'ActionHelpers.ts');

        assert.equal(result.includes('@deprecated'), false);
        assert.equal(result.includes('getVariableIsVisible'), false);
        assert.equal(result.includes('setVariableVisible'), false);
        assert.match(result, /function getNumberVariable/);
        assert.match(result, /function setFrameVisible/);
        assert.match(result, /function getFrameVisible/);
    });

    it('strips every current @deprecated API from Actions.d.ts', () => {
        const source = fs.readFileSync(path.join(thisDir, '../types/Actions.d.ts'), 'utf8');
        const result = strip(source, 'Actions.d.ts');

        assert.equal(result.includes('@deprecated'), false);
        assert.equal(result.includes('stylekit'), false);
        assert.equal(result.includes('FormattedTextVariable'), false);
        assert.equal(result.includes('formattedText'), false);
        assert.match(result, /brandKit: BrandKit/);
        assert.match(result, /richText = 'richText'/);

        const between = (startMarker, endMarker) => {
            const start = result.indexOf(startMarker);
            const end = result.indexOf(endMarker);
            assert.ok(start >= 0 && end > start, `expected ${startMarker} before ${endMarker}`);
            return result.slice(start, end);
        };

        assert.match(
            between('export interface Frame ', 'export interface FrameMethods'),
            /readonly isVisible: boolean/,
        );
        assert.match(
            between('export interface FrameMethods', 'export type FrameWithMethods'),
            /setVisible\(isVisible: boolean/,
        );
        assert.equal(
            between('export interface VariableMethods', 'export type VariableWithMethods').includes('setVisible'),
            false,
        );
        assert.equal(
            between('export interface VariablesController', 'export interface LayoutsController').includes(
                'setVisible',
            ),
            false,
        );
        assert.equal(
            between('export interface BaseVariable', 'export interface ShortTextVariable').includes('isVisible'),
            false,
        );
        assert.match(
            between('export interface FramesController', 'export interface VariablesController'),
            /setVisible\(name: string \| Frame/,
        );
    });
});
