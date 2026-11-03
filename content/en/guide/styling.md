---
title: Styling
description: Use native CSS, className, and CSS custom properties.
group: Essentials
---

## Import CSS

Jinge does not currently include scoped CSS. Organize rules with component-specific prefixes, or use the CSS Modules support provided by Vite.

```ts
import './style.css';
```

## Combine class names

`className` is compiled to the DOM `class` attribute. Use `cx()` to combine class names conditionally.

```tsx
import { cx } from 'jinge';

<div className={cx('panel', state.active && 'active')} />;
```

## Dynamic styles

The `style` property takes a string, rather than a React-style object. Include units explicitly. CSS custom properties are a useful bridge between state and styles. Try themes, rounded corners, and progress in the [styling example](/examples/styling/).

```tsx
<div style={`width:${state.progress}%;--accent:${state.color}`} />
```
