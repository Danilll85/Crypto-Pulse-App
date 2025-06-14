import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "plugin:import/recommended",
      "plugin:import/typescript",
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@features",
              message: "Avoid direct imports from features. Use only allowed layers.",
            },
          ],
        },
      ],
      "import/no-unresolved": "error",
      "import/no-relative-packages": "error",
      "import/no-relative-parent-imports": "error",
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  }
);
