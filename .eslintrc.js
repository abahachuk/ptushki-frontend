module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "prettier/react", "plugin:prettier/recommended"],
  plugins: [
    "eslint-plugin-react-hooks",
    "eslint-plugin-jest",
    "eslint-plugin-typescript"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    "jest/globals": true
  },
  rules: {
    // no-unused-vars throws false positives for TS types, so using typescript/no-unused-vars
    "no-unused-vars": "off",
    "lines-between-class-members": "off",
    "typescript/no-unused-vars": "error",

    "import/no-unresolved": "disable",
    "import/prefer-default-export": "disable",

    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx"]
      }
    ],
    "react/prop-types": "disable",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "prefer-arrow-callback": [
      "warn",
      {
        allowNamedFunctions: false
      }
    ],
    "func-style": ["error", "expression"],
    "func-names": ["off"],
    "no-shadow": "off"
  }
};
