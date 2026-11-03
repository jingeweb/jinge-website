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

The turning points, in order:

| When    | Change                                                                                                                                                                         | Commit                                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| 2019.02 | First commit; the framework and the [jinge-demos](https://github.com/jingeweb/jinge-demos) repo started the same day                                                           | [`3995937`](https://github.com/jingeweb/jinge/commit/3995937f47b27d058c9c4360455e577d707e0dd7)               |
| 2020.01 | [jinge-material](https://github.com/jingeweb/jinge-material) ships 1.0.0 — the first component library, with a full [documentation site](https://jingeweb.github.io/material/) | [`287422e`](https://github.com/jingeweb/jinge-material/commit/287422eabf206b79ae36aefef2e47ddece1bed9a)      |
| 2020.04 | [jinge-router](https://github.com/jingeweb/jinge-router) split into its own repo                                                                                               | [`45fdb8e`](https://github.com/jingeweb/jinge-router/commit/45fdb8e9c4ac986c9dfcb5f2c359ba1f9428793d)        |
| 2020.05 | Framework rewritten in TypeScript (v2)                                                                                                                                         | [`e57bfe8`](https://github.com/jingeweb/jinge/commit/e57bfe837ac8d7c02c68f9afbc013bca0915d6a5)               |
| 2020.06 | v3.0, following webpack 5                                                                                                                                                      | [`d6a891e`](https://github.com/jingeweb/jinge/commit/d6a891ef1df2bd78ad14dac62046f3724772f329)               |
| 2022.05 | Template compiler became its own repo: TypeScript, Angular-style HTML templates                                                                                                | [`46f4720`](https://github.com/jingeweb/jinge-compiler/commit/46f4720ab9ac80d7f2114301b000f93ba6e006d9)      |
| 2022.08 | [jinge-material](https://github.com/jingeweb/jinge-material) stops being maintained at 3.0.3. **Obsolete**                                                                     | [`e4a3d51`](https://github.com/jingeweb/jinge-material/commit/e4a3d517c5f1431da4bc595b693712f505b88b5b)      |
| 2024.07 | Compiler rewritten in Rust; templates moved from HTML to standard TSX                                                                                                          | [`51fda81`](https://github.com/jingeweb/jinge-rust-compiler/commit/51fda8173ff7ff0a2779e5e67a295e905c66c02d) |
| 2025.02 | [jinge-antd](https://jinge-antd.embjs.com) component library started, still in progress                                                                                        | —                                                                                                            |
| 2026.11 | jinge-antd finished with AI assistance and its docs published; the framework site and docs go live ([jinge.embjs.com](https://jinge.embjs.com))                                | —                                                                                                            |

Two full rewrites in a different language (the framework once, the compiler once) and one change of template paradigm (HTML to TSX), carried forward since 2019 without a reset.
