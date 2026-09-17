import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { stripDeprecatedDeclarations } from "./compress.mjs";

const thisDir = path.dirname(fileURLToPath(import.meta.url));

describe("stripDeprecatedDeclarations", () => {
    it("removes @deprecated properties, methods, enum members, and types", () => {
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

        const result = stripDeprecatedDeclarations(source);

        assert.equal(result.includes("stylekit"), false);
        assert.equal(result.includes("FormattedTextVariable"), false);
        assert.equal(result.includes("formattedText"), false);
        assert.equal(result.includes("@deprecated"), false);
        assert.match(result, /brandKit: BrandKit/);
        assert.match(result, /export interface FrameMethods[\s\S]*setVisible\(isVisible: boolean\): void/);
        assert.equal(result.includes("VariableMethods") && result.includes("setReadonly"), true);
        assert.equal(/interface VariableMethods[\s\S]*setVisible/.test(result), false);
        assert.match(result, /readonly isReadonly: boolean/);
        assert.equal(/readonly isVisible: boolean/.test(result), false);
        assert.match(result, /\| ShortTextVariable/);
        assert.match(result, /\| RichTextVariable/);
    });

    it("removes future @deprecated helper functions while keeping the rest", () => {
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

        const result = stripDeprecatedDeclarations(source);

        assert.match(result, /function getNumberVariable/);
        assert.match(result, /function copyVariableValueFromTo/);
        assert.equal(result.includes("setVariableVisible"), false);
        assert.equal(result.includes("getVariableIsVisible"), false);
        assert.equal(result.includes("@deprecated"), false);
    });

    it("strips current @deprecated helpers from ActionHelpers.ts", () => {
        const source = fs.readFileSync(path.join(thisDir, "../src/ActionHelpers.ts"), "utf8");
        const result = stripDeprecatedDeclarations(source, "ActionHelpers.ts");

        assert.equal(result.includes("@deprecated"), false);
        assert.equal(result.includes("getVariableIsVisible"), false);
        assert.equal(result.includes("setVariableVisible"), false);
        assert.match(result, /function getNumberVariable/);
        assert.match(result, /function setFrameVisible/);
        assert.match(result, /function getFrameVisible/);
    });

    it("strips every current @deprecated API from Actions.d.ts", () => {
        const source = fs.readFileSync(path.join(thisDir, "../types/Actions.d.ts"), "utf8");
        const result = stripDeprecatedDeclarations(source, "Actions.d.ts");

        assert.equal(result.includes("@deprecated"), false);
        assert.equal(result.includes("stylekit"), false);
        assert.equal(result.includes("FormattedTextVariable"), false);
        assert.equal(result.includes("formattedText"), false);
        assert.match(result, /brandKit: BrandKit/);
        assert.match(result, /richText = 'richText'/);

        const between = (startMarker, endMarker) => {
            const start = result.indexOf(startMarker);
            const end = result.indexOf(endMarker);
            assert.ok(start >= 0 && end > start, `expected ${startMarker} before ${endMarker}`);
            return result.slice(start, end);
        };

        assert.match(between("export interface Frame ", "export interface FrameMethods"), /readonly isVisible: boolean/);
        assert.match(between("export interface FrameMethods", "export type FrameWithMethods"), /setVisible\(isVisible: boolean/);
        assert.equal(between("export interface VariableMethods", "export type VariableWithMethods").includes("setVisible"), false);
        assert.equal(between("export interface VariablesController", "export interface LayoutsController").includes("setVisible"), false);
        assert.equal(between("export interface BaseVariable", "export interface ShortTextVariable").includes("isVisible"), false);
        assert.match(between("export interface FramesController", "export interface VariablesController"), /setVisible\(name: string \| Frame/);
    });
});
