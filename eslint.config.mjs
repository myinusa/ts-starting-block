import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslintjs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import _import from "eslint-plugin-import";
import node from "eslint-plugin-n";
import promise from "eslint-plugin-promise";
import securityNode from "eslint-plugin-security-node";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals"
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const importGroups = [
  // Side effect imports.
  [String.raw`^\u0000`],
  // Packages.
  // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
  [String.raw`^@?\w`],
  // Absolute imports and other imports such as Vue-style `@/foo`.
  // Anything not matched in another group.
  ["^"],
  // Relative imports.
  // Anything that starts with a dot
  [String.raw`^\.`],
  // Typings
  [String.raw`^@?\w.*\u0000$`, String.raw`^[^.].*\u0000$`, String.raw`^\..*\u0000$`],
];


const importRules = {
  "n/no-unpublished-import": "off",
  "n/no-missing-import": "off",
  "n/no-process-exit": "off",
  "import/first": "error",
  "import/newline-after-import": "error",
  "import/no-duplicates": "error",
  "simple-import-sort/imports": [
    1,
    {
      groups: importGroups,
    },
  ],
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: ["../*"],
          message: "For imports of parent elements use better path aliases. For example, @domain/shared.",
        },
      ],
    },
  ],
};

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: eslintjs.configs.recommended,
  allConfig: eslintjs.configs.all,
});

const cherryRules = {
  "@typescript-eslint/naming-convention": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/prefer-readonly-parameter-types": "off",
};


/** @type {Awaited<import('typescript-eslint').Config>} */
export default tseslint.config(
  // eslintjs.configs.all,
  eslintjs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  node.configs["flat/recommended"],
  unicorn.configs["flat/all"],
  ...fixupConfigRules(
    compat.extends(
      "plugin:promise/recommended",
      // "plugin:import/recommended",
      // "plugin:import/recommended",
      // "plugin:import/typescript",
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
      "simple-import-sort": eslintPluginSimpleImportSort,
      // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      import: fixupPluginRules(_import),
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
      globals: {
        ...globals.node,
        ...globals.es2020,
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
      ...cherryRules,
      "no-magic-numbers": ["warn", { ignoreArrayIndexes: true }],
      "unicorn/prefer-top-level-await": 0,
      "sonarjs/unused-import": 1,
      "@typescript-eslint/no-unused-vars": 0,
      "unicorn/prevent-abbreviations": 0,
      "unicorn/prefer-ternary": 0,
      "unicorn/prefer-spread": 1,
      "unicorn/no-null": 0,
      "sonarjs/no-dead-store": 0,
      "sonarjs/no-unused-vars": 0,
      "sonarjs/pseudo-random": 0,
    },
  },
);
