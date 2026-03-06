# MCP instructions — Unity SMP Website (Imperial-Jedi-SMP)

Purpose: Help an MCP-compliant coding agent run, inspect, and safely modify this repository. Keep changes minimal, explicit, and reversible.

Repo essentials

- Type: static single-page site (HTML/CSS/JS). No build system or server-side code in the repo.

- Primary files: `index.html`, `styles.css`, `script.js`. Images are in the repo root (e.g., `Unity SMP Logo.png`, `Big_Logo.png`).

What an MCP agent should do first

1. Read `index.html`, `script.js`, and `styles.css` to understand structure and behavior. The site implements "pages" as `<div id="home" class="page">` sections toggled by `script.js` using the `hidden` CSS class.

2. If asked to host the site, serve the repository root as static files on a configurable port (default 3000). Return the served URL (for example, `http://localhost:3000`).

3. When editing content, limit edits to the primary files unless the user requests broader changes.

Serving example (optional)

Provide a minimal Node/Express server only when asked to host or add endpoints. Keep dependencies explicit and request permission before modifying package manifests.

```js
// Minimal example (optional)
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));
app.get('/healthz', (_req, res) => res.json({ok: true}));
app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
```

Editing rules & patterns

- Navigation uses inline onclick handlers (e.g., `onclick="showPage('join')"`). When adding behavior you may keep this style or attach listeners in `script.js` — be consistent.

- Preserve section ids (`home`, `join`, `rules`, `creator`) unless updating `script.js` accordingly.

- Use root-relative image paths if adding assets to match existing references.

- Avoid introducing build tools, bundlers, or frameworks unless explicitly requested.

Verification checklist (agent should run these after edits)

- Open `index.html` in a browser or start the minimal server and visit `http://localhost:3000`.

- Click navigation links or call `showPage('join')` in the console to verify toggling.

- Confirm styles and images load correctly.

When to create a PR vs commit directly

- Small copy fixes (typos) can be committed directly if you have permission.

- Changes that affect layout, UX, new assets, or JS behavior should be delivered via PR with a short description and screenshots.

If blocked or missing context

- Report the missing info (e.g., desired visual change, new asset source). Present 1–2 concrete options and ask for selection.

End of MCP instructions.
# MCP instructions — Unity SMP Website (Imperial-Jedi-SMP)

Purpose: Help an MCP-compliant coding agent run, inspect, and safely modify this repository. Keep changes minimal, explicit, and reversible.

Repo essentials
- Type: static single-page site (HTML/CSS/JS). No build system, no server code in repo.
- Primary files: `index.html`, `styles.css`, `script.js`. Images live in repo root (`Unity SMP Logo.png`, `Big_Logo.png`, etc.).

What an MCP agent should do first
1. Read `index.html`, `script.js`, and `styles.css` to understand structure and behavior. The site implements "pages" as `<div id="home" class="page">` sections toggled by `script.js` using the `hidden` CSS class.
2. If asked to host the site, serve the repository root as static files on a configurable port (default 3000). Return the served URL.
3. When editing content, limit edits to the primary files unless user requests broader changes.

Serving example (agent may use this pattern)
Provide a minimal, optional Node/Express server only when asked to host or add health endpoints. Keep dependencies explicit and ask before modifying package manifests.

```js
// Minimal example (not required by default)
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname)));
app.get('/healthz', (_req, res) => res.json({ok: true}));
app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
```

Editing rules & patterns
- Navigation uses inline onclick handlers (e.g., `onclick="showPage('join')"`). When adding behavior you may keep this style or attach event listeners in `script.js` — be consistent.
- Preserve section ids (`home`, `join`, `rules`, `creator`) unless updating `script.js` accordingly.
- Use root-relative image paths if adding assets to match existing references.
- Avoid introducing build tools, bundlers, or frameworks unless explicitly requested.

Verification checklist (agent should run these after edits)
- Open `index.html` in a browser or start the minimal server and visit `http://localhost:3000`.
- Click navigation links or call `showPage('join')` in the console to verify toggling.
- Confirm styles and images load correctly.

When to create a PR vs commit directly
- Small copy fixes (typos) can be committed directly if you have permission.
- Changes that affect layout, UX, new assets, or JS behavior should be delivered via PR with a short description and screenshots.

If blocked or missing context
- Report the missing info (e.g., desired visual change, new asset source). Present 1–2 concrete options and ask for selection.

End of MCP instructions.
