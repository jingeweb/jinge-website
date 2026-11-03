---
title: Context
description: Share configuration and services across component levels.
group: Components
---

## Provide and read a value

An ancestor provides a Context value and descendants read it. Symbol keys reduce accidental collisions between modules.

```tsx
import { context, vm } from 'jinge';

const ThemeKey = Symbol('theme');

function App() {
  const theme = vm({ dark: false });
  context(ThemeKey, theme);
  return <Toolbar />;
}

function Toolbar() {
  const theme = context<{ dark: boolean }>(ThemeKey);
  return (
    <button on:click={() => (theme.dark = !theme.dark)}>{theme.dark ? 'Dark' : 'Light'}</button>
  );
}
```

## Reactivity comes from the value

Context passes values. Passing a VM lets descendants observe that VM’s properties; Context is not an additional state management system.

## Choose a useful boundary

Themes, session information, and service instances are suitable Context values. Prefer Props for a direct parent-to-child dependency. Try the [Context example](/examples/context/).
