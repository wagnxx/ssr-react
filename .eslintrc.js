module.exports = {
  root: true,
  extends: [
    'standard-react-ts'
  ],
  globals: {
    __isBrowser__: 'readonly'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/space-before-function-paren': 'off'
  }
}
