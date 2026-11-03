---
title: Built-in components
description: Control flow, dynamic content, and transitions.
group: API
---

## If

Render the default slot when `expect` is true and the optional `slot:else` otherwise. Switching branches destroys components from the previous branch. Ternaries and `&&` are convenient compiler-supported alternatives. See [Conditions](/examples/if/).

```tsx
<If expect={state.visible} slot:else={<p>Content is hidden</p>}>
  <p>Now you can see me.</p>
</If>
```

## For

Iterate over a reactive array; `loop` may also be null or undefined. `key` can be a data property name, `KEY_INDEX`, or `KEY_DATA`. The function slot receives `data`, `index`, `isFirst`, and `isLast`.

Template `.map()` is a shorter form. The compiler reads the returned root element’s key to configure matching. Stable business IDs help retain input and node state during reordering.

```tsx
<For loop={state.items}>{(item) => <p>{item.data.title}</p>}</For>
```

```tsx
<For loop={state.items} key="id">
  {(item) => (
    <p>
      {item.index + 1}. {item.data.title}
    </p>
  )}
</For>
```

## Dynamic

`fc` is a component function. Changing it creates a new instance; other attributes are passed to the current component.

```tsx
<Dynamic fc={state.current} title={state.title} />
```

## lazy / Lazy

`lazy()` returns an async component. The underlying `Lazy` handles loading, errors, and destruction. Its loader must resolve to a component function; optional loading and error slots provide feedback.

```tsx
const Panel = lazy(() => import('./panel').then((m) => m.Panel), {
  'slot:loading': <p>Loading</p>,
  'slot:error': (props) => <p>{props.error.message}</p>,
});
```

## Portal

Render content in the optional `target` HTMLElement, which defaults to document.body and is read during initialization. Portal content is destroyed with its owner. Complete overlays still need focus and keyboard behavior.

```tsx
<Portal target={document.body}>
  <div role="status">This content renders in the target container.</div>
</Portal>
```

## Transition / TransitionGroup

Entry, exit, and list animation use matching CSS classes. Read the [complete transition example](/examples/transition/) and configure durations, classes, and structure together.

| Transition property                 | Meaning                                          |
| ----------------------------------- | ------------------------------------------------ |
| isEnter                             | Enter when true; leave when false                |
| appear                              | Animate the initial render; defaults to false    |
| destroyAfterLeave                   | Destroy content after leaving; defaults to false |
| enterClass / leaveClass             | Target classes for the corresponding state       |
| enterActiveClass / leaveActiveClass | Classes active while the transition runs         |

Callbacks are `on:beforeEnter`, `on:afterEnter`, `on:enterCancelled`, `on:beforeLeave`, `on:afterLeave`, and `on:leaveCancelled`. Content must have one root Element. `TransitionGroup` combines loop, key, and transition classes for list items.
