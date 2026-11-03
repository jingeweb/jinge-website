---
title: Router basics
description: Give your SPA a clear page structure.
group: Router
---

## Install

Your application TSX still needs the Jinge compiler. Keep the router and runtime on compatible versions.

```sh
pnpm add jinge-router
```

## Define pages

Define a route array, provide the router through `Router`, and place `RouterView` where pages should appear. Navigation components and hooks must be used inside that context.

```tsx
import { Router, RouterView, RouterHref, createRouter } from 'jinge-router';

function Home() {
  return <h1>Home</h1>;
}
function About() {
  return <h1>About</h1>;
}

const router = createRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ],
});

function App() {
  return (
    <Router router={router}>
      <nav>
        <RouterHref to="/about">About</RouterHref>
      </nav>
      <RouterView />
    </Router>
  );
}
```

## Navigation state

Use `RouterHref` with `activeClass` to highlight a section and `exactActiveClass` for an exact match. Choose RouterLink when the anchor needs custom structure or behavior.

## Serving your pages

History mode uses normal URL paths but requires real static entries or server fallback. Hash mode does not require server-side handling of subroutes. See [Deployment](/guide/deployment/).

## Try it

The [router example](/examples/router-navigation/) demonstrates users, query strings, nested layouts, and history. Its address bar affects only the isolated preview, making route changes easy to inspect.
