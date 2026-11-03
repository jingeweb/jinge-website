---
title: Meet Jinge
description: Standard TSX for lightweight reactive applications.
group: Getting started
---

## Write the TypeScript you know

Jinge is an MVVM framework for browser interfaces. Define components as functions, describe templates with standard TSX, and create reactive data with `vm()`. Its runtime uses ES Proxy. The compiler turns templates into DOM operations and data subscriptions, without a virtual DOM.

```tsx
import { bootstrap, vm } from 'jinge';

function App() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>Count: {state.count}</button>;
}

bootstrap(App, document.getElementById('app')!);
```

## Three parts working together

| Package        | Responsibility                                                                   |
| -------------- | -------------------------------------------------------------------------------- |
| jinge          | Reactive data, components, DOM updates, and lifecycle                            |
| jinge-compiler | Rust / SWC template compilation, the Vite plugin, and internationalization tools |
| jinge-router   | SPA navigation, nested layouts, reactive parameters, and query strings           |

## Where Jinge fits

Start with function components and reactive state for a small tool, a standalone interface, or an SPA with multiple pages and shared components. Vite is the current primary build integration. Evaluate component libraries, debugging tools, and third-party integrations against your application requirements.

## Next steps

Follow [Quick start](/guide/quick-start/) to create a project, then explore the [interactive examples](/examples/). Coming from Vue or React? Read [From Vue / React](/guide/from-vue-react/) first.
