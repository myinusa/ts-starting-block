import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import eslintConfigPrettier from "eslint-config-prettier";
// import eslint_js from "@eslint/js";
import node from "eslint-plugin-n";
import promise from "eslint-plugin-promise";
import securityNode from "eslint-plugin-security-node";
import { fixupPluginRules } from "@eslint/compat";

const importRules = {
  "n/no-unpublished-import": "off",
  "n/no-missing-import": "off",
};

/** @type {Awaited<import('typescript-eslint').Config>} */
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  node.configs["flat/recommended"],
  unicorn.configs["flat/all"],
  {
    files: ["**/*.ts"],
  },
  {
    ignores: ["node_modules", "build", "dist", "logs"],
  },
  {
    plugins: {
      sonarjs: sonarjs,
      "security-node": fixupPluginRules(securityNode),
      promise: fixupPluginRules(promise),
    },
    settings: {
      n: {
        tryExtensions: [".js", ".ts", ".d.ts"],
      },
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs"],
          defaultProject: "./tsconfig.json",
        },
        tsconfigRootDir: import.meta.name,
      },
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  {
    rules: {
      ...sonarjs.configs.recommended.rules,
      //   ...unicorn.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...importRules,
      "unicorn/prefer-top-level-await": 0,
      "sonarjs/unused-import": 0,
      "@typescript-eslint/no-unused-vars": 0,
      "unicorn/prevent-abbreviations": 0,
      "unicorn/prefer-spread": 1,
      "sonarjs/no-dead-store": 0,
      "sonarjs/no-unused-vars": 0,
    },
  },
);
