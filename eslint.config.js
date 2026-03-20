export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'warn',
    },
  },
];
