// basic eslint settings to use via CLI

module.exports = {
    plugins: ['no-array-any'],
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/strict',
        'airbnb-typescript', // must be below `@typescript-eslint/recommended`
        'plugin:mobx/recommended',
        'plugin:compat/recommended',
        'plugin:eslint-comments/recommended',
    ],
    rules: {
        'prefer-arrow-callback': 'off', // prevents using of named components as `observer` args
        'consistent-return': 'off', // not needed in TS
        'no-restricted-syntax': 'off', // TODO?
        'multiline-ternary': ['error', 'always-multiline'],
        'object-curly-newline': ['error', { 'multiline': true }],
        'max-len': ['error', { 'code': 120, 'ignoreComments': true }],
        'no-array-any/no-array-any': 'error',
        'react/react-in-jsx-scope': 'off', // new jsx transform
        'react/require-default-props': 'off', // not needed in TS
        'react/jsx-indent': [
            'error',
            2,
            { indentLogicalExpressions: true },
        ],
        'eslint-comments/disable-enable-pair': ['error', {allowWholeFile: true}],
        'eslint-comments/require-description': 'warn',
        'mobx/missing-observer': 'off', // false positive
        'import/extensions': 'off',
        'import/prefer-default-export': 'off', // https://t.me/why_not_export_default
        '@typescript-eslint/array-type': ['error', {
            default: 'generic',
            readonly: 'generic',
        }], // more explicit
        '@typescript-eslint/consistent-type-imports': 'error',
        'import/order': [
            'error',
            {
                'pathGroups': [
                    {
                        'pattern': '@/**',
                        'group': 'internal'
                    }
                ],
                groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ],
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        node: true,
    },
    globals: {
        window: 'readonly',
    },
    settings: {
        'import/extensions': [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
        ],
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
};
