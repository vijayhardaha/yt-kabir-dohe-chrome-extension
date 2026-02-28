# Copilot instructions for YT Kabir Ke Dohe extension

This repository is a Chrome extension that posts random Kabir couplets as
comments on YouTube videos and likes the video. The entire app runs in the
browser; there is no backend service. The following notes should help an AI
assistant craft relevant code and understand the project layout quickly.

## Architecture & flow

- `public/` contains static assets that are copied verbatim into `dist/` by
  Vite. `manifest.json` (MV3) declares a service worker `background.js`,
  permissions, icons and web-accessible `comments.json`.
- Source code lives in `src/`:
  - `background.js` listens for the extension icon click and calls
    `chrome.scripting.executeScript` with either `tasks/watch.js` or
    `tasks/shorts.js` depending on URL.
  - `tasks/` scripts run in the page context to post comments/like videos;
    they import helper functions from `utils/utils.js`.
  - `utils/utils.js` exports DOM helpers, comment formatting (`prepareComment`)
    and a fetch helper which uses `chrome.runtime.getURL("comments.json")`.
- `scripts/fetchComments.mjs` is a small Node script that downloads Kabir
  couplets from an external API and writes `public/comments.json`. This
  script is invoked manually (`pnpm fetchdata`) and not part of the build.

## Build / dev workflows

Use pnpm (lockfile present). available commands in \`package.json\`:

```json
{
	"scripts": {
		"dev": "vite build --watch --mode development",
		"build": "vite build",
		"lint": "eslint . --ext .js",
		"format": "prettier \"src/**/*.{js,css,html}\" --write",
	}
}
```

- `pnpm dev` rebuilds on file changes. `pnpm build` produces `dist/`.
  Output filenames are deterministic: `background.js`, `tasks/watch.js`,
  `tasks/shorts.js`, and any CSS in `dist/assets/*.css`.
- No source maps in production; `vite.config.mjs` sets `sourcemap: false`.
- Public folder is disabled (`publicDir: false`) because asset copying is
  manual; see `static/` if added.
- Sass is supported by installing `sass` and importing `.scss` files from JS.

## Conventions & patterns

- Aliases: `@` maps to `src` (set in `vite.config.mjs` and documented in
  `jsconfig.json`). Use it for imports inside the source tree.
- No TypeScript – everything is plain JavaScript with `//` comments.
- The service worker (background script) must remain ESM-compatible; do not
  bundle commonJS modules there.
- Content scripts must be self-contained (no `import` at runtime) because
  they are executed by `chrome.scripting.executeScript` which only accepts
  file paths. When building with Vite, the entry graph transpiles imports into
  a single file.
- Styling: CSS is generated when imported from JS, output names come from the
  `assetFileNames` pattern. Use `.scss` files if you want Sass features.

## Linting & formatting

- ESLint configuration is in `eslint.config.mjs`. It extends the shared
  plugin set and enforces Prettier formatting.
- Run `pnpm lint` and `pnpm lint:fix`.
- Prettier settings in `prettier.config.mjs`; use `pnpm format`.

## Typical tasks for AI assistance

- **Add new content script**: add entry under `rollupOptions.input` in
  `vite.config.mjs`, import helpers from `utils`, and update
  `background.js` to reference the new file.
- **Modify manifest**: edit `public/manifest.json`, then rebuild.
- **Change comment source format**: update `scripts/fetchComments.mjs` and
  regenerate `public/comments.json` with `pnpm fetchdata`.
- **Add CSS**: create `.scss` in `src/`, import from one of the entry JS
  files; check `dist/assets` after build.

## Project-specific quirks

- The build outputs must match the manifest paths exactly (no hashed names).
- `comments.json` is treated as a safe, local resource; updates are manual.
- Only YouTube URL matches trigger scripts; logic in `background.js` is
  primitive string `includes` checks – updates must be reflected there.

## Integration & dependencies

- The only runtime dependency is the Chrome Extensions API (`chrome.*`).
- Development dependencies include Vite, ESLint, Prettier, and optional
  Sass.
- No backend services or APIs are invoked at runtime.

When writing suggestions, avoid making architectural changes unless the user
asks for them; focus on incremental, verifiable modifications that maintain
manifest and runtime compatibility.
