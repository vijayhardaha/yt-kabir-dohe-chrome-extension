/**
 * ==============================================================================
 * VITE BUNDLE CONFIGURATION
 * ==============================================================================
 * Purpose: Builds the Chrome extension with deterministic entry file paths
 * compatible with the current manifest and executeScript runtime contract.
 * Docs: https://vite.dev/config/
 * ==============================================================================
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	// ==========================================
	// MODULE RESOLUTION
	// ==========================================
	// Preserve @ alias parity with editor jsconfig settings.
	resolve: { alias: { "@": resolve(__dirname, "src") } },

	// ==========================================
	// BUILD OUTPUT POLICY
	// ==========================================
	// Keep deterministic dist output and disable source maps for production parity.
	build: {
		outDir: "dist",
		sourcemap: false,
		rollupOptions: {
			input: {
				background: resolve(__dirname, "src/background.js"),
				"tasks/watch": resolve(__dirname, "src/tasks/watch.js"),
				"tasks/shorts": resolve(__dirname, "src/tasks/shorts.js"),
			},
			output: {
				entryFileNames: "[name].js",
				assetFileNames: "assets/[name][extname]",
			},
		},
	},
});
