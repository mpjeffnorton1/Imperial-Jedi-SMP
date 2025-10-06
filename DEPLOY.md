Deploying Unity SMP static site to Cloudflare Pages

1) Repository & build command

- Connect your Git repo to Cloudflare Pages in the Cloudflare dashboard.
- Set the Build command to:

  npm run build

- Set the Publish directory to:

  dist

2) What the build does

- The included `build.js` script copies all files from the repo root into `dist/` while excluding `node_modules`, `.git`, and `dist` itself. Cloudflare Pages will then serve the contents of `dist/`.

3) Local preview

- Install Node.js (if not installed). From the repo root run:

  npm run build

- Serve the `dist/` folder locally (optional):

  # using Python's simple HTTP server
  python -m http.server 8000 --directory dist

  # or using Node (serve package recommended)

4) Notes & tips

- Root-relative image paths (e.g. `/Images/aqua.png`) will resolve fine on Cloudflare Pages. If you experience missing images, ensure they were copied into `dist/Images` by the build step.
- If you prefer a different build/pipeline (minification, asset hashing, bundlers), I can add an npm-based toolchain, but this minimal approach keeps the repo simple and deployable quickly.
