// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error", // Enforce no explicit 'any'
    },
  },
]);
