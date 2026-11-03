---
title: Components and Props
description: Compose interfaces with functions and typed boundaries.
group: Components
---

## Define a function component

Declare the Props type to let your editor check component attributes. The compiler connects dynamic template attributes to the child component.

```tsx
function Greeting(props: { name: string }) {
  return <h2>Hello, {props.name}.</h2>;
}

function App() {
  const state = vm({ name: 'Jinge' });
  return <Greeting name={state.name} />;
}
```

## Report events to a parent

Pass a function property to report an application event to the parent component. Native DOM events still use the `on:` form.

```tsx
function Action(props: { onConfirm: (value: string) => void }) {
  return <button on:click={() => props.onConfirm('confirmed')}>Confirm</button>;
}
```

## Generic components

TypeScript generics can express relationships between data, callbacks, and rendered content. Slots can carry types as well; see [Slots](/guide/slots/).

## Where state belongs

A `vm()` created inside a component belongs to that instance. Lift shared state to a parent and pass it down, or organize it with a module-level VM or Context. Your application must manage the lifetime of shared state.

## Initialization and updates

The component function performs initialization. Reactive expressions inside its template handle later updates. Use `watch()` for effects that depend on changing Props, rather than expecting the entire function to run again.
