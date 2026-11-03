---
title: Build and deploy
description: Ship your application as static assets.
group: Tooling
---

## Production builds

The Vite plugin resolves to `jinge/dev` during development and the production entry for a production build. HMR is a development feature; production Tree Shaking removes the corresponding runtime code.

```sh
pnpm exec vite build
pnpm exec vite preview
```

## History and hash

HTML5 History routing requires the server to return the entry HTML for application paths. GitHub Pages has no general server rewrite configuration. A simple SPA can use hash routing; a public documentation site can generate a real HTML file for each path instead.

```ts
const router = createRouter({
  mode: 'hash',
  routes: [{ path: '/', component: Home }],
});
```

## Subdirectory deployments

Vite’s `base` controls asset paths. The router’s `baseHref` controls route prefixes. They solve different problems. In hash mode, `baseHref` is inside the hash; do not add a matching route prefix merely because the HTML is hosted in a subdirectory.

## How this website is deployed

This website generates HTML entries for documentation and example pages and uses jinge-router for navigation. Known paths have real files, and unknown paths show a 404 page. `public/CNAME` declares `jinge.embjs.com`.

The repository includes a GitHub Actions workflow. Choose GitHub Actions as the Pages source, point the `jinge` DNS CNAME to the owner’s `<owner>.github.io`, configure the custom domain in Pages, and enable HTTPS after verification.

## Compatibility and verification

Before release, test direct document links, reloads, browser history, asset loading, and narrow viewports. Use compatible runtime and compiler versions. This website currently uses the Jinge 4.2 series.
