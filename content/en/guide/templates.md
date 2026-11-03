---
title: Templates and rendering
description: Describe structure, conditions, and lists with TSX.
group: Essentials
---

## Attributes and events

TSX expressions describe dynamic text and attributes. Prefer `on:click` and `on:input` for events so they remain distinct from ordinary component properties.

```tsx
<button disabled={state.busy} on:click={() => submit()}>
  {state.busy ? 'Submitting' : 'Submit'}
</button>
```

## Conditional rendering

The compiler turns ternaries and `&&` expressions inside templates into reactive rendering logic. For explicit control, use the built-in `If` component. See the [conditional example](/examples/if/).

```tsx
{
  state.visible && <p>Now you can see me.</p>;
}
{
  state.loggedIn ? <Dashboard /> : <Login />;
}
```

## List rendering

The compiler handles template `.map()` calls as list rendering. Choose a stable business ID to help match DOM nodes during reordering. Jinge’s `key` mainly supports this compilation step; do not assume every key behavior from another framework applies.

```tsx
<ul>
  {state.items.map((item) => (
    <li key={item.id}>{item.title}</li>
  ))}
</ul>
```

## Fragments and nested components

Return a fragment when no wrapper element is needed. Use an uppercase name to reference a component and import it using normal TypeScript syntax.

```tsx
function App() {
  return (
    <>
      <Header />
      <main>
        <Content />
      </main>
    </>
  );
}
```
