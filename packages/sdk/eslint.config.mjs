import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    jsxA11y.flatConfigs.recommended,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        plugins: {
            prettier: prettierPlugin,
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            'no-fallthrough': ['error', { commentPattern: '[Ff]alls?\\s?-?\\s?through' }],
            indent: 0,
            'prettier/prettier': 'error',
            'import/extensions': 0,
            'linebreak-style': 0,
            'object-curly-newline': 0,
            'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
            'import/no-unresolved': ['error', { ignore: ['@chili-studio/connector-types'] }],
            'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
            'max-len': 0,
            'no-shadow': 0,
            radix: 0,
        },
    },
    {
        files: ['**/tests/**/*.ts', '**/tests/**/*.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        ignores: ['**/dist/**', '**/lib/**', '_bundles/**', '**/next/**/*.js', '**/.storybook/**', '**/src/stories/**'],
    },
]);
