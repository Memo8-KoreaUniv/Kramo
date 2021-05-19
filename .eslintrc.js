const customRule = require('./naming-convention')

module.exports = {
  extends: ['eslint-config-yceffort/typescript'],
  rules: {
    '@typescript-eslint/naming-convention': customRule.extendedRules,
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'react/react-in-jsx-scope': ['off'],
  },
}
