import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarJSPlugin from 'eslint-plugin-sonarjs';
import cspellESLintPluginRecommended from '@cspell/eslint-plugin/recommended';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
  },
  playwright.configs['flat/recommended'],
  pluginJs.configs.recommended,
  sonarJSPlugin.configs.recommended,
  cspellESLintPluginRecommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
);
