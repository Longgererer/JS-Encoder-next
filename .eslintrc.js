/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
  },
  "plugins": [
    "vue",
    "@typescript-eslint",
  ],
  "globals": { defineOptions: "writable", NodeJS: true },
  "rules": {
    "vue/comment-directive": "off",
    "vue/no-v-for-template-key": "off",
    "vue/no-multiple-template-root": "off",
    "arrow-parens": [
      "error",
      "always",
    ],
    "camelcase": "off",
    "comma-dangle": "off",
    "comma-spacing": "off",
    "curly": "error",
    "eqeqeq": ["error", "always"],
    "guard-for-in": "error",
    "indent": "off",
    "linebreak-style": "off",
    "max-classes-per-file": ["error", 1],
    "max-len": ["error", {
      "code": 120,
      "tabWidth": 2,
      "ignorePattern": "^import |^export \\{(.*?)\\}",
    }],
    "max-lines": ["error", 600],
    "max-lines-per-function": ["error", 60],
    "multiline-comment-style": "off",
    "new-parens": "error",
    "no-bitwise": "off",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": "off",
    "no-empty": "off",
    "no-eval": "error",
    "no-extra-label": "error",
    "no-extra-semi": "off",
    "no-debugger": "error",
    "no-dupe-class-members": "off",
    "no-new-wrappers": "error",
    "no-prototype-builtins": "off",
    "no-shadow": "off",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "no-useless-escape": "off",
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "prefer-arrow-callback": ["error", {
      "allowNamedFunctions": true,
    }],
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "quotes": [2, "single", { "avoidEscape": true }],
    "quote-props": "off",
    "radix": "error",
    "semi": "off",
    "space-before-function-paren": "off",
    "spaced-comment": "off",
    "@typescript-eslint/array-type": [
      "error",
      {
        "default": "array-simple",
      },
    ],
    "@typescript-eslint/ban-types": ["error", {
      "types": {
        "object": false,
        "{}": false,
      },
      "extendDefaults": true,
    }],
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/comma-spacing": ["error"],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/member-ordering": ["error", {
      "default": [
        "public-static-field",
        "protected-static-field",
        "private-static-field",
        "public-static-method",
        "protected-static-method",
        "private-static-method",
        "public-field",
        "protected-field",
        "private-field",
        "constructor",
        "public-method",
        "protected-method",
        "private-method",
        "public-abstract-method",
        "protected-abstract-method",
        "private-abstract-method",
      ],
    }],
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-dupe-class-members": ["error"],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extra-semi": ["error"],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-expressions": ["error", {
      "allowTernary": true,
    }],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/quotes": [
      "error",
      "single",
    ],
    "@typescript-eslint/semi": [
      "error",
      "never",
    ],
    "@typescript-eslint/space-before-function-paren": ["error", {
      "anonymous": "never",
      "asyncArrow": "always",
      "named": "never",
    }],
    "@typescript-eslint/triple-slash-reference": ["error", {
      "path": "always",
      "types": "prefer-import",
      "lib": "always",
    }],
    "@typescript-eslint/typedef": [
      "error",
      {
        "parameter": true,
        "propertyDeclaration": true,
      },
    ],
    "@typescript-eslint/unified-signatures": "error",
    "vue/multi-word-component-names": "off",
  },
}
