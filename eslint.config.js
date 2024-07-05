import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
  },
  {
    rules: {
      // Possible Errors
      "no-debugger": "warn",
      "no-extra-semi": "error",

      // Best Practices
      eqeqeq: "error",
      "no-implied-eval": "error",
      "no-return-assign": "error",

      // Variables
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],

      // Stylistic Issues
      semi: ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],

      // ES6
      "no-var": "error",
      "prefer-const": "error",

      // React
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react/prop-types": 0, // Disables PropTypes validation
    },
  },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];
