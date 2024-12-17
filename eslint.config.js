/// <reference types="./src/types.d.ts" />

import eslint from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tailwind from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "src/types/*.d.ts"],
  ignores: [
    "**/*.config.*",
    "**/*.astro",
    "node_modules/**",
    "dist/**",
    "**/*.d.ts",
    ".astro/**",
  ],
  plugins: {
    import: importPlugin,
    "@stylistic/ts": stylisticTs,
    "@stylistic/js": stylisticJs,
    prettier: prettierPlugin,
    "simple-import-sort": simpleImportSortPlugin,
    "react-hooks": reactHooksPlugin,
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  languageOptions: {
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: import.meta.dirname,
    },
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    ...tailwind.configs["flat/recommended"],
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "es5",
        bracketSpacing: true,
        jsxBracketSameLine: false,
        tabWidth: 2,
        semi: true,
        useTabs: false,
      },
    ],
    "@stylistic/js/max-len": [
      "error",
      {
        code: 80,
        ignoreComments: true,
        ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
        ignoreStrings: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "@typescript-eslint/no-non-null-assertion": ["warn"],
    "@typescript-eslint/no-misused-promises": [
      2,
      { checksVoidReturn: { attributes: false } },
    ],
    "@typescript-eslint/no-unnecessary-condition": [
      "warn",
      {
        allowConstantLoopConditions: true,
      },
    ],
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    ...reactHooksPlugin.configs.recommended.rules,
  },
});
