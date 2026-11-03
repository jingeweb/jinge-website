---
title: Reactive data
description: Describe state with vm and connect changes to your interface.
group: Essentials
---

## Create state

`vm()` wraps an object or array in a reactive ViewModel. Read its properties directly in the template and update them in event handlers.

```tsx
import { vm } from 'jinge';

export function Counter() {
  const state = vm({ count: 0, user: { name: 'Jinge' } });
  return (
    <section>
      <p>
        {state.user.name}: {state.count}
      </p>
      <button on:click={() => state.count++}>Increment</button>
    </section>
  );
}
```

## Keep property access intact

Reading a primitive into a local variable produces a snapshot, not a reactive reference. Use `state.count` in the template rather than expecting a destructured number to keep updating. A component function initializes an instance; it does not run again for every state change.

```ts
const state = vm({ count: 0 });
const count = state.count; // A plain number snapshot, not a reactive reference
state.count++;
```

## Update arrays

Operations such as `push()` and `splice()` on a VM array notify the rendered list. The [list example](/examples/list-rendering/) demonstrates insertion, deletion, and reordering.

## Effects outside templates

The compiler handles reactive property reads inside templates. Use [watch](/guide/watch/) for requests, logging, and other effects. A plain variable calculated during initialization is not a computed value.

## Raw data and boundaries

`vmRaw()` retrieves the original data. Mutating it directly bypasses Proxy notifications. `vmIgnore()` marks an object that should not be converted to a VM. Verify notification behavior with a small example when using complex data structures.

Circular references are protected from infinite notification loops. Notifications are not guaranteed to follow an arbitrary number of repeated turns around a cycle. Watch the target object’s own property instead.
