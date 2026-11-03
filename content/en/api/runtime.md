---
title: Runtime API
description: Application startup, data models, and lifecycle.
group: API
---

## bootstrap

Start a root component and return its host and exposed references. A container other than document.body is replaced with the component’s output; do not assume that placeholder remains in the DOM. Normally bootstrap once.

```ts
bootstrap(Component, container, props?, context?);
```

## vm / vmRaw / vmIgnore

`vm()` creates a reactive object or array. `vmRaw()` retrieves its original data. Direct writes to that raw data bypass Proxy notifications. `vmIgnore()` marks objects that do not need VM conversion.

```ts
const state = vm({ count: 0 });
const raw = vmRaw(state);
```

## watch / vmWatch

`watch()` follows the current component’s lifecycle. `vmWatch()` returns a manual unsubscribe function. Both support property, path, and object watching. See [Watching state](/guide/watch/).

```ts
watch(state, 'count', handler, { immediate: true });
watch(state, ['user', 'name'], handler);
watch(state, handler);
const stop = vmWatch(state, 'count', handler);
```

## onMount / onUnmount

Register during component initialization. A mount callback may return cleanup logic for resources created after mounting.

```ts
onMount(() => {
  const unsubscribe = subscribe();
  return unsubscribe;
});
onUnmount(() => release());
```

## ref / expose

Refs hold DOM or component references. `expose()` defines the methods a parent can access. Read [Refs and lifecycle](/guide/lifecycle/).

```ts
const input = ref<HTMLInputElement>();
expose({ focus: () => input.value?.focus() });
```

## context

Provide a value in an ancestor and read it in a descendant using a string or Symbol key. Reactivity comes from the value being passed.

```ts
context(key, value); // Provide in an ancestor
const value = context<ValueType>(key); // Read in a descendant
```

## nextTick / cx

`nextTick()` waits for the current round of queued framework updates. Read DOM measurements after awaiting it. Updates queued by a callback for a later round are not included. `cx()` combines conditional class names.

## Type helpers

`FC` describes function components, `JNode` describes template nodes, and `WithSlots` types default, named, and function slots. The installed package’s declarations are the source of truth for exact signatures.

## Internationalization API

| API                                   | Behavior                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| intlInit(options)                     | Initialize defaultLocale, dicts, and optional dictLoader; returns a Promise                |
| intlSetLocale(locale)                 | Load a dictionary if needed and switch locale asynchronously                               |
| intlGetLocale()                       | Return the current locale identifier                                                       |
| intlWatchLocale(callback, immediate?) | Observe locale changes and return an unsubscribe function                                  |
| t(text, params?, options?)            | Compiler-assisted messages, parameters, and rich text; options may specify an explicit key |

Configure dictionaries and template compilation together, as described in [Internationalization](/guide/i18n/). Compiler-generated renderIntl functions are internal helpers, not business APIs.

```ts
onUnmount(
  intlWatchLocale((locale) => {
    console.log('Current locale:', locale);
  }),
);
```
