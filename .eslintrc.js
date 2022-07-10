module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  rules: {
    quotes: [
      "error",
      "double",
    ],
    "react/no-array-index-key": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "react/prop-types": "off",
    "no-console": "off",
    "no-shadow": "off",
    "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
};
