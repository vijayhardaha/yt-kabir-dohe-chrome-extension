/**
 * ==============================================================================
 * ESLINT CONFIGURATION
 * ==============================================================================
 * Purpose: Defines linting quality gates for source files and integrates
 * Prettier checks into the lint workflow.
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * ==============================================================================
 */

import globals from "globals";
import pluginJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
	// ==========================================
	// BASE RECOMMENDED RULESET
	// ==========================================
	// Start from ESLint's recommended JavaScript rules.
	pluginJs.configs.recommended,

	// ==========================================
	// GLOBAL IGNORES
	// ==========================================
	// Exclude generated and non-source artifacts from linting.
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
	// Apply language options and formatting rules to source files.
	{
		// Restrict this block to JavaScript and TypeScript source files.
		files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],

		// ==========================================
		// LANGUAGE OPTIONS
		// ==========================================
		// Configure parser language level, source type, and runtime globals.
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: { ...globals.browser, ...globals.node },
		},

		// ==========================================
		// PLUGINS
		// ==========================================
		// Register Prettier plugin so formatting can be enforced by ESLint.
		plugins: { prettier: prettierPlugin },

		// ==========================================
		// SHARED SETTINGS
		// ==========================================
		// Let React lint rules detect installed React version automatically.
		settings: { react: { version: "detect" } },

		// ==========================================
		// CUSTOM RULES
		// ==========================================
		// Report formatting differences as ESLint errors.
		rules: { "prettier/prettier": "error" },
	},
]);
