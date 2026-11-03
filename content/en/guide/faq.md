---
title: Frequently asked questions
description: Start debugging with the update path and build configuration.
group: Tooling
---

## Why did changing a variable not update the interface?

Check that the data is wrapped in `vm()`, the template reads its properties, and `jingeVitePlugin()` compiles the TSX. A primitive snapshot or direct write to the raw object does not notify the template.

## Can I use React components directly?

TSX is syntax, not a shared runtime. React components depend on React’s rendering and state model and cannot be used as Jinge components directly. Ordinary DOM libraries can be integrated with Refs and lifecycle callbacks.

## Does Jinge support server-side rendering?

The current implementation targets browser DOM. This website produces static documentation HTML during its build and starts Jinge in the browser. It does not imply framework-level SSR or hydration support.

## Why does reloading a route return 404?

History mode needs server fallback or a real HTML file for each public path. A static SPA can use hash mode. See [Deployment](/guide/deployment/).

## Is there an online editor?

The website provides interactive previews and readable source code. Playground is recorded in TODO. Its prerequisites are Rspack integration for jinge-compiler and a compiler build that can integrate with Rspack through WASM.

## How do I report a problem?

Open an Issue in the relevant GitHub repository with a minimal reproduction, package versions, browser, and build steps. Find the runtime, compiler, and router repositories on the [ecosystem page](/ecosystem/).
