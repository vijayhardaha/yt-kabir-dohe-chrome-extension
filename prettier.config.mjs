/**
 * ==============================================================================
 * PRETTIER CONFIGURATION
 * ==============================================================================
 * Purpose: Defines deterministic formatting rules so local development and CI
 * produce the same output for JavaScript and related files.
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
	// Maximum preferred line length before wrapping.
	printWidth: 80,
	// Display width of each indentation level.
	tabWidth: 2,
	// Use tabs instead of spaces for indentation characters.
	useTabs: true,

	// ==========================================
	// PUNCTUATION STYLE
	// ==========================================
	// Always terminate statements with semicolons.
	semi: true, // Always use semicolons
	// Prefer double quotes in JavaScript/TypeScript files.
	singleQuote: false, // Double quotes (standard for HTML/React props)
	// Preserve existing line endings across environments.
	endOfLine: "auto", // Maintains existing line endings
	// Add trailing commas where valid in ES5 syntax.
	trailingComma: "es5", // Commas where valid in ES5

	// ==========================================
	// SPACING & WRAPPING
	// ==========================================
	// Always include parentheses around arrow function parameters.
	arrowParens: "always", // (x) => {} instead of x => {}
	// Insert spaces between brackets in object literals.
	bracketSpacing: true, // { foo: bar }
	// Keep closing bracket on a new line for multi-line tags.
	bracketSameLine: false, // Puts > on a new line
	// Respect manual wrapping in prose files.
	proseWrap: "preserve", // Respect manual line breaks
	// Position wrapped operators at the start of continued lines.
	experimentalOperatorPosition: "start", // Align operators in multiline expressions
	// Preserve existing object wrapping style where possible.
	objectWrap: "collapse", // Preserve existing wrapping of objects

	// ==========================================
	// FILE OVERRIDES
	// ==========================================
	// Apply parser overrides for file types that do not infer cleanly.
	overrides: [
		{
			// Use plaintext parser for root plain-text config files.
			files: [".editorconfig", ".gitignore", ".prettierignore"],
			options: { parser: "plaintext" },
		},
	],
};
