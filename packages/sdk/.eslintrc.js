module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended', // should be at the last
    ],
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        indent: 0,
        'prettier/prettier': 0,
        'import/extensions': 0,
        'linebreak-style': 0,
        'object-curly-newline': 0,
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
        'max-len': 0,
        'no-shadow': 0,
        radix: 0,
    },
    ignorePatterns: ['**/dist/*.js', '**/lib/**/*.ts', '_bundles/*.js', '**/.storybook/**', '**/src/stories/**'],
};
