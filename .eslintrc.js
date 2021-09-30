const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [require.resolve('@cc/eslint-config-react')],
  rules: {
    'no-unused-vars': WARNING,
    'no-debugger': WARNING,
  },
};
