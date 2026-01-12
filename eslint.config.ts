import dartessEslintPluginRecommended from '@dartess/eslint-plugin/recommended';
import dartessEslintPluginRecommendedPostFormat from '@dartess/eslint-plugin/recommended-post-format';
import dartessEslintPluginReact from '@dartess/eslint-plugin/react';
import dartessEslintPluginMobx from '@dartess/eslint-plugin/mobx';
// @ts-ignore: https://github.com/antfu/eslint-plugin-format/issues/11
import format from 'eslint-plugin-format';
import { parseGitIgnore } from '@dartess/eslint-plugin/utils';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
  parseGitIgnore(), // the easiest way to ignore all `.gitignore` files

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },

  {
    settings: {
      mobx: {
        storeHooks: ['useStore', 'useTheme'],
      },
    },
  },

  ...dartessEslintPluginRecommended,
  ...dartessEslintPluginReact,
  ...dartessEslintPluginMobx,

  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    plugins: {
      format,
    },
    rules: {
      'format/prettier': [
        'error',
        {
          parser: 'typescript',
          singleQuote: true,
          printWidth: 100,
        },
      ],
    },
  },

  ...dartessEslintPluginRecommendedPostFormat,

  {
    name: 'own rules',
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off', // TODO fix it
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off', // TODO check it
    },
  },

  {
    name: 'dev-related sources overrides',
    files: ['*.{js,mjs,cjs,ts,mts,jsx,tsx}', 'scripts/**/*'],
    rules: {
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'import-x/no-nodejs-modules': 'off',
      'import-x/no-default-export': 'off',
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
];
