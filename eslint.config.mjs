import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { plugins: ['tailwindcss'] },
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // 關閉 JSX 需要 React 的規則
      'react/prop-types': 'off', //關閉 ESLint 的 react/prop-types 規則
      'tailwindcss/classnames-order': 'off', // Respect prettier-plugin-tailwindcss order
    },
  },
  {
    ignores: [
      '.contentlayer/**/*',
      '/public/robots.txt',
      '/public/sitemap*.xml',
      '/public/atom.xml',
      '/public/feed.xml',
      '/public/feed.json',
    ],
  },
];
