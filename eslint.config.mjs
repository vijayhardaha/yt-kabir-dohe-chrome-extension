/**
 * ==============================================================================
 * ESLINT CONFIGURATION
 * ==============================================================================
 * Purpose: Defines linting quality gates for JavaScript and TypeScript source
 * to catch bugs early and enforce consistent formatting with Prettier.
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * ==============================================================================
 */

import globals from "globals";
import pluginJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
	// ==========================================
	// BASELINE RECOMMENDED RULES
	// ==========================================
	// Why: Starts from ESLint's recommended ruleset for common JavaScript pitfalls.
	// Default: Without this, only explicitly listed custom rules would apply.
	// Use Case: Ensures baseline safety checks with minimal manual rule setup.
	pluginJs.configs.recommended,

	// ==========================================
	// GLOBAL IGNORES
	// ==========================================
	// Why: Exclude generated, build, and non-source files from linting.
	// Default: ESLint would lint all files unless ignored here.
	// Use Case: Focuses lint on maintainable code only.
	{
		ignores: [
			".env.local",
			".env",
			"*.generated.js",
			"*.log",
			"*.tsbuildinfo",
			"bower_components/",
			"build/",
			"coverage/",
			"dist/",
			"lib/scripts/**/*.js",
			"node_modules/",
			"spec/**/*.js",
			"test/**/*.js",
		],
	},

	// ==========================================
	// SOURCE FILE RULESET
	// ==========================================
	// Why: Applies language options and formatting enforcement for source files.
	// Default: Parser and globals fallback may vary by runtime/context.
	// Use Case: Keeps browser/node globals and formatting checks consistent.
	{
		// Why: Restricts this rule block to source-like files only.
		// Default: A config block without `files` can affect every matched file.
		// Use Case: Prevents accidental linting behavior drift for non-source assets.
		files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],

		// ==========================================
		// LANGUAGE OPTIONS
		// ==========================================
		// Why: Defines syntax level, module mode, and global environments.
		// Default: ESLint defaults may not align with modern ESM usage.
		// Use Case: Avoids false positives for Node and browser global names.
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: { ...globals.browser, ...globals.node },
		},

		// ==========================================
		// PLUGINS
		// ==========================================
		// Why: Registers Prettier as an ESLint plugin for format-rule integration.
		// Default: Prettier checks are not available through ESLint without this.
		// Use Case: Lets CI fail on formatting issues via the lint command.
		plugins: {
			prettier: prettierPlugin,
		},

		// ==========================================
		// SHARED SETTINGS
		// ==========================================
		// Why: React version auto-detection keeps React rules environment-aware.
		// Default: Some React rules assume a fixed or unknown version.
		// Use Case: Prevents version-mismatch lint noise across environments.
		settings: {
			react: {
				version: "detect",
			},
		},

		// ==========================================
		// CUSTOM RULES
		// ==========================================
		// Why: Enforces formatter parity by surfacing formatting issues in lint.
		// Default: Formatting differences may only appear in editor/CI format steps.
		// Use Case: One command (`eslint`) reports both code and style violations.
		rules: {
			"prettier/prettier": "error",
		},
	},
]);
