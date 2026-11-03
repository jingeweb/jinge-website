---
title: Dynamic components and animation
description: Load on demand, switch components, and add transitions.
group: Advanced
---

## Dynamic components

`Dynamic` destroys the previous instance and creates a new one when `fc` changes. Lift state outside the instance if it should survive a switch. There is no built-in KeepAlive.

```tsx
import { Dynamic, vm, type FC } from 'jinge';

const state = vm<{ current: FC }>({ current: Overview });
<Dynamic fc={state.current} />;
```

## Async components

The loader passed to `lazy()` must resolve to a component function. Loading and error slots describe the intermediate states. Try the [dynamic components example](/examples/dynamic-components/) to observe loading and instance replacement.

```tsx
import { lazy } from 'jinge';

const Settings = lazy(() => import('./Settings').then((module) => module.Settings), {
  'slot:loading': <p>Loading…</p>,
  'slot:error': (props) => <p>{props.error.message}</p>,
});
```

## Transitions and list animation

`Transition` combines component entry and exit with CSS. `TransitionGroup` handles list scenarios. Choose durations appropriate to your interface and respect reduced-motion preferences. The [transition example](/examples/transition/) includes the complete CSS and component configuration.

## Portal

Portal renders content into a target DOM container, which is useful for overlays. Focus management, keyboard dismissal, and scroll locking remain the overlay component’s responsibility. See [Built-in components](/api/components/).
