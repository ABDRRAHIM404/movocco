// ESLint flat config for the Movocco Android pilot (Expo SDK 58).
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*', 'scripts/*', 'assets/*'],
  },
]);
