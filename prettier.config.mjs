/**
 * ==============================================================================
 * PRETTIER CONFIGURATION
 * ==============================================================================
 * Purpose: Defines deterministic formatting rules so local development, code
 * reviews, and CI produce identical output.
 * Docs: https://prettier.io/docs/en/configuration.html
 * ==============================================================================
 */

/**
 * @type {import('prettier').Config}
 */
export default {
	// ==========================================
	// LINE WIDTH & INDENTATION
	// ==========================================
	// Why: Keeps lines readable while matching project indentation conventions.
	// Default: `printWidth` is 80 and `tabWidth` is 2 when omitted.
	// Use Case: Reduces noisy wrapping changes in PR diffs.
	printWidth: 80,
	tabWidth: 2,
	useTabs: false,

	// ==========================================
	// QUOTES, SEMICOLONS & COMMAS
	// ==========================================
	// Why: Standardizes core JavaScript style choices across all contributors.
	// Default: `semi: true`, `singleQuote: false`, `trailingComma: "all"` (v3).
	// Use Case: Avoids style debates and ensures stable formatting output.
	semi: true,
	singleQuote: false,
	trailingComma: "es5",

	// ==========================================
	// SPACING & FUNCTION SYNTAX
	// ==========================================
	// Why: Improves readability for objects and callback signatures.
	// Default: `bracketSpacing: true`, `arrowParens: "always"`.
	// Use Case: Keeps object literals and arrow functions consistently shaped.
	bracketSpacing: true,
	arrowParens: "always",
};
