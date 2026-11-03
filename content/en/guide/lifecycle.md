---
title: Refs and lifecycle
description: Connect DOM nodes and external resources at the right time.
group: Components
---

## Mount and unmount

Register lifecycle callbacks during component initialization. Use `onMount()` when you need DOM nodes that have already been inserted into the page.

```tsx
import { onMount, onUnmount, ref } from 'jinge';

function CanvasPanel() {
  const canvas = ref<HTMLCanvasElement>();
  onMount(() => {
    const ctx = canvas.value?.getContext('2d');
    ctx?.fillRect(0, 0, 40, 40);
  });
  onUnmount(() => {
    // Release external resources owned by this component
  });
  return <canvas ref={canvas} width={200} height={100} />;
}
```

## Clean up effects

`onMount()` may return a cleanup function. Release listeners, timers, chart instances, and subscriptions when the component is destroyed.

```ts
onMount(() => {
  const timer = window.setInterval(refresh, 1000);
  return () => window.clearInterval(timer);
});
```

## Component references

A DOM Ref holds a node. A child component can use `expose()` to publish a deliberate set of methods to its parent. Avoid coupling parents to a child’s internal DOM structure.

## Third-party libraries

The [ECharts example](/examples/integrated-with-echarts/) shows chart initialization and disposal. The [refs and lifecycle example](/examples/ref-and-life-cycle/) demonstrates DOM and component references.
