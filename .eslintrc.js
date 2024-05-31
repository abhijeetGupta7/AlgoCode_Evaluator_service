module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      // 'plugin:prettier/recommended',           // i have commented bcz only eslint is enough, also both were conflicting 
      // 'prettier',
      'eslint:recommended'
    ],
    plugins: ['@typescript-eslint',"simple-import-sort"],
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      project: 'tsconfig.json',
    },
    env: {
      es6: true,
      node: true,
    },
    rules: {
      semi: 'error',
      indent: ['error', 2, { SwitchCase: 1 }],
      'prefer-const': 'error',
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    },
  };