---
title: From Vue / React
description: Familiar syntax, with a different update model.
group: Getting started
---

## What feels like Vue

Jinge wraps objects in a Proxy and updates the interface when reactive properties change. Getting started with `vm()` feels similar to Vue’s `reactive()`, but Jinge uses TSX templates and has its own compiler rules and APIs.

## What feels like React

Components are functions, TSX keeps structure near logic, and TypeScript describes Props. Jinge does not use a virtual DOM and does not re-run the component function for every state update.

| Task           | Jinge approach                            |
| -------------- | ----------------------------------------- |
| State          | `const state = vm({ count: 0 })`          |
| Update         | `state.count++`                           |
| Effects        | `watch(state, 'count', handler)`          |
| DOM access     | `ref()` and `onMount()`                   |
| Composition    | Props and `WithSlots`                     |
| URL parameters | The reactive VM returned by `useParams()` |

## A counter

Create state once during initialization, then read and update its properties directly.

```tsx
function Counter() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>{state.count}</button>;
}
```

## Three common mistakes

- Destructuring a primitive with `const { count } = state` does not create a live reactive reference.
- A state change does not re-run the component function. Use `watch()` for effects.
- `style` is currently a string, and named slots use `slot:name` attributes. Do not copy React style objects or Vue template directives unchanged.

Run the [examples](/examples/), then read [Templates and rendering](/guide/templates/) to understand the compilation boundary.
