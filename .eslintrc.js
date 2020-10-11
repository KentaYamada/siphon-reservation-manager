module.exports = {
  root: true,
  env: { node: true },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "off",
    "comma-dangle": ["error", "never"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/naming-convention": [
      "error",
      { selector: "default", format: ["camelCase"] },
      { selector: "class", format: ["PascalCase"] },
      { selector: "interface", format: ["PascalCase"] },
      { selector: "typeAlias", format: ["PascalCase"] },
      { selector: "property", format: null },
      { selector: "variable", format: null },
      { selector: "enum", format: null },
      { selector: "enumMember", format: null },
      { selector: "typeParameter", format: ["PascalCase"] },
      { selector: "method", format: ["camelCase"], leadingUnderscore: "allow", trailingUnderscore: "allow" }
    ]
  },
  overrides: [{ files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"], env: { jest: true } }]
};
