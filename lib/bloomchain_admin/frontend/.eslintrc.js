module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    es2017: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    tsconfigRootDir: "./",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier", "react", "import", "react-hooks"],
  rules: {
    "brace-style": "off",
    "func-call-spacing": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: false,
      },
    ],
    "no-alert": "error",
    "no-var": "error",
    "no-console": "error",
    curly: "error",
    "space-before-blocks": ["error", "always"],
    "@typescript-eslint/brace-style": ["error"],
    "@typescript-eslint/no-dynamic-delete": ["error"],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        classes: true,
        functions: false,
        variables: false,
        typedefs: true,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/camelcase": [
      "error",
      {
        properties: "always",
      },
    ],
    "@typescript-eslint/array-type": [
      "error",
      {
        properties: "array-simple",
      },
    ],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-ignore": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/generic-type-naming": ["error", "^[A-Z]+$"],
    "camelcase": "off",
    "@typescript-eslint/camelcase": [
      "error",
      {
        "properties": "never"
      }
    ],
    indent: "off",
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "ignoredNodes": ["TSUnionType", "TSIntersectionType"],
        "flatTernaryExpressions": true,
        "SwitchCase": 1,
      },
    ],
    "@typescript-eslint/interface-name-prefix": [
      "error",
      {
        prefixWithI: "never",
      },
    ],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        allowSingleExtends: true,
      },
    ],
    "@typescript-eslint/no-unnecessary-condition": [
      "error",
      {
        ignoreRhs: true,
      },
    ],
    "@typescript-eslint/prefer-interface": 0,
    "@typescript-eslint/no-explicit-any": [
      "error",
      {
        ignoreRestArgs: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "all",
        ignoreRestSiblings: true,
      },
    ],
    quotes: "off",
    "react/sort-comp": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": 2,
    "import/no-anonymous-default-export": [
      "error",
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowLiteral: false,
        allowObject: false,
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".ts", ".tsx"],
      },
    ],
    "react/prop-types": 0,
    "react/no-array-index-key": 0,
    "react/jsx-no-target-blank": [
      "error",
      {
        allowReferrer: true,
        enforceDynamicLinks: "always",
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
}
