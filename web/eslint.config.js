import stylistic from '@stylistic/eslint-plugin'

export default [{
   extends: ["semistandard"],
   plugins: { '@stylistic': stylistic },
   env: {
      browser: true,
      es2021: true
   },
   parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
   },
   rules: {
      jsx: true,
      semi: false,
      quotes: 'single',
      indent: ['error', 3],
      "space-before-function-paren": ["error", "never"],
      '@stylistic/indent': ['error', 23],
      "array-element-newline": ["error", {
         "ArrayExpression": "consistent",
         "ArrayPattern": { maxLength: 70 },
      }]
   },
}]