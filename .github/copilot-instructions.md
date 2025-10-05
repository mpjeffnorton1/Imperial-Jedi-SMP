# Copilot instructions — Imperial-Jedi-SMP

Purpose: Give AI coding agents the minimum, actionable knowledge to work productively on this static website repository.

Key points (short):

- This is a small static website (HTML + CSS + vanilla JS). Primary files: `index.html`, `styles.css`, `script.js`, several image assets in repo root.
- Pages are single-file sections toggled by `showPage(pageName)` in `script.js`. Avoid adding routing frameworks; keep behavior client-side.
- Images are referenced by root-relative paths (e.g., `/UnitySMPLogo.png`). Keep image file names and root placement when adding or updating images.
- No build system, package.json, or server-side code found. Changes should be made directly to source files and validated by opening `index.html` in a browser.

What to change and how (examples):

- Add a new page: create a new `<div id="foo" class="page hidden">` in `index.html`, add a nav link calling `showPage('foo')`. Keep structure consistent with existing pages.
- Update hero or sections: edit the HTML in `index.html`. CSS lives in `styles.css` — prefer adding classes rather than inline styles.
- Add JS behavior: put simple functions in `script.js`. Use the existing pattern: DOM queries and `classList` toggles. Example function exists: `showPage(pageName)`.

Conventions and patterns found (do not invent):

- Single-page style: different "pages" are sections hidden/shown via `.hidden` class. Keep class names and show/hide pattern consistent.
- Assets are stored alongside root; links to Discord use absolute URLs (e.g., `https://discord.gg/2RhhczWp`). Don't change external links without confirmation.
- Team and content blocks follow repeated card/grid patterns — new items should reuse existing markup to keep consistent styles.

Developer workflows discovered:

- No npm/packager: open `index.html` directly in a browser to preview. For Windows PowerShell, a quick preview command is: `Start-Process index.html`.
- No tests or CI configured in repo. Commit small, focused changes and test manually by reloading the browser.

Safety and guardrails for AI edits:

- Preserve root image filenames and relative paths. If adding images, include them at repo root and reference them with `/name.png`.
- Avoid introducing frameworks (React/Vite/etc.). This project is intentionally minimal.
- Don't change Discord invite links or contact details.

Files to reference when working:

- `index.html` — primary content and page structure
- `script.js` — all custom JS behavior (page switching function)
- `styles.css` — styling and responsive patterns
- `README.md` — project title and short description

If merging with existing `.github/copilot-instructions.md` content:

- Preserve any maintainer notes and contact details. Merge by keeping the above project-specific rules and adding any missing maintainer guidance.

If you need more context or the user asks for a new feature (forms, build system, or server), ask a clarifying question before implementing.

---

Please review and tell me any sections you want expanded or examples to add.
