---
title: Philosophy and history
description: No directives, no template DSL — just components.
group: Getting started
---

## Everything is a component

Jinge has no concept of a "directive".

Most frameworks treat `if` and `for` as template directives, macros, or compiler sugar. Jinge makes them **components**. The conditions and loops you write in TSX compile down to real component calls:

| What you write                                | What the compiler produces                           |
| --------------------------------------------- | ---------------------------------------------------- |
| `cond ? <A /> : <B />`                        | `<If expect={cond} slot:else={<B />}><A /></If>`     |
| `list.map((item) => <Row key={item.id} … />)` | `<For loop={list} key={item.id}>{(each) => …}</For>` |

`<If>` and `<For>` are ordinary components exported by `jinge`, with a fully public interface:

```tsx
<If expect={state.show} slot:else={'Show'}>
  Hide
</If>

<For loop={state.items} key="id">
  {(each) => <Row item={each.data} index={each.index} />}
</For>
```

So the mental model of the framework collapses into three things: **components, props, and slots**. No directives, no template DSL, no extra syntax to memorise — the TSX you write is the final component tree.

More importantly, control flow is not an unchangeable language primitive. When the built-in implementation cannot carry your case, you can write your own control-flow component and use it explicitly; the cost is giving up the matching syntactic sugar and owning the key reuse and diffing that `For` performs. We plan to let the compiler target a custom component for that sugar — only then does "if you don't like it, implement it yourself" fully close the loop.

## Standard TSX, no virtual DOM

The template is just TSX, so TypeScript checking, IDE completion and refactoring all apply, and both props and slots are typed. At runtime `vm()` wraps a plain object in a Proxy, so assigning a property updates the interface. Without a virtual DOM there is no diff and no re-render pass.

```tsx
function App() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>Count: {state.count}</button>;
}
```

## Smallness you can measure

| Item                   | Size                     |
| ---------------------- | ------------------------ |
| Framework bundle (min) | about 31 KB              |
| Hello World build      | about 3 KB (1.4 KB gzip) |
| HMR runtime            | about 100 lines          |

Nothing is saved by dropping features: built-in i18n, generic components, slots and context all live in the core, while routing is provided separately by `jinge-router`.

## The compiler is written in Rust

`jinge-compiler` is built on SWC and turns TSX into DOM operations in Rust, shipping a Vite plugin and an i18n toolchain alongside. It compiles templates into precise DOM and listener code: extracting i18n keys while keeping default text, and turning conditions and loops into components, both happen at this step.

## History

> This section is coming soon.
