---
title: Watching state
description: Respond to changes outside the template.
group: Advanced
---

## Watch inside a component

Call `watch()` during component initialization. The subscription is removed automatically when the component is destroyed. Set `immediate: true` to invoke the callback immediately.

```tsx
import { vm, watch } from 'jinge';

function Search() {
  const state = vm({ query: '', status: '' });
  watch(state, 'query', (value) => {
    state.status = `Searching: ${value}`;
  });
  return <input value={state.query} on:input={(event) => (state.query = event.target.value)} />;
}
```

## Paths and deep watching

Watch a path when you need a particular nested property. Watch an object when you need its deep changes. Avoid unconditionally writing back to the same property from its own callback.

```ts
watch(state, ['user', 'name'], (name) => console.log(name));
watch(state, (value) => console.log(value), { immediate: true });
```

## Watch outside a component

`vmWatch()` works outside component initialization and returns an unsubscribe function. The caller must invoke it at an appropriate point in its own lifecycle.

```ts
const stop = vmWatch(state, 'count', (value) => console.log(value));
// When no longer needed
stop();
```

## Request races

When a request depends on changing state, handle stale responses in your application with an AbortController or request sequence number. The [watching example](/examples/watch/) covers additional path and notification behavior.
