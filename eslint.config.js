import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import n from 'eslint-plugin-n';
/* import jest from "eslint-plugin-jest"; */
import security from 'eslint-plugin-security';
import prettierConfig from 'eslint-config-prettier';
import babelParser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  {
    ignores: [
      '.next/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '**/*.min.js',
      'next.config.js',
      'node_modules/**',
    ],
  },

  /**
   * @description This section contains the linting configuration rules for
   * the clientside codebase of the application.
   */
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: ['@babel/preset-react'] },
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'import': importPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/no-array-index-key': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
        },
      ],
      'react/jsx-no-target-blank': [
        'error',
        {
          allowReferrer: false,
          enforceDynamicLinks: 'always',
          warnOnSpreadAttributes: true,
        },
      ],
      'react-refresh/only-export-components': 'warn',
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'comma-dangle': ['warn', 'always-multiline'],
    },
  },

  /**
   * @description This section contains the linting configuration rules for
   * the serverside codebase of the application.
   */
  {
    files: ['server/**/*.{js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,

        sourceType: 'module',
      },
    },
    plugins: {
      n,
      import: importPlugin,
    },
    rules: {
      'n/no-unpublished-import': 'error',
      'n/no-unsupported-features/es-syntax': [
        'error',
        {
          ignores: ['modules'],
          version: '>=20.0.0',
        },
      ],
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },

  /**
   * @description This section contains the linting configuration rules for
   * the shared codebase of the application.
   */
  {
    plugins: {
      security,
      import: importPlugin,
    },
    rules: {
      'no-var': 'error',
      'object-shorthand': 'error',
      'eqeqeq': ['error', 'always'],
      'consistent-return': 'error',
      'import/extensions': ['error', 'ignorePackages'],
      'security/detect-possible-timing-attacks': 'warn',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-object-injection': 'warn',
      'comma-dangle': ['warn', 'always-multiline'],
    },
  },
  prettierConfig,
];
