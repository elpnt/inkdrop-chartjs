module.exports = {
  extend: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['prettier', 'react', 'react-hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
