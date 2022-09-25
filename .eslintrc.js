module.exports = {
  env: {
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:mocha/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'mocha', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'prettier/prettier': 'off',
  },
  root: true,
};
