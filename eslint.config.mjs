import eslintjs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import eslintConfigPrettier from "eslint-config-prettier";
import node from "eslint-plugin-n";
import promise from "eslint-plugin-promise";
import securityNode from "eslint-plugin-security-node";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const importRules = {
  "n/no-unpublished-import": "off",
  "n/no-missing-import": "off",
};

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: eslintjs.configs.recommended,
  allConfig: eslintjs.configs.all,
});


/** @type {Awaited<import('typescript-eslint').Config>} */
export default tseslint.config(
  eslintjs.configs.all,
  ...tseslint.configs.recommended,
  node.configs["flat/recommended"],
  unicorn.configs["flat/all"],
  ...fixupConfigRules(
    compat.extends(
      "plugin:promise/recommended",
      // "plugin:import/recommended",
    ),
  ),
  { files: ["src/**/*.{ts}"] },
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
      ...securityNode.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
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
