import { defineConfig } from 'eslint-define-config';
import globals from 'globals';
import airbnbBase from 'eslint-config-airbnb-base';
import prettierPlugin from 'eslint-plugin-prettier'; // 👈 IMPORTANT: import the plugin

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin, // 👈 Register the plugin manually
    },
    rules: {
      ...airbnbBase.rules,
      'prettier/prettier': ['warn'], // now this rule will work properly
    },
  },
]);
