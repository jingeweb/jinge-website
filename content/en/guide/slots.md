---
title: Slots
description: Compose components with typed content slots.
group: Components
---

## The default slot

`props.children` corresponds to the default slot. Declare slot types with `WithSlots`, and access a named slot through `props['slot:name']`.

```tsx
import { type JNode, type WithSlots } from 'jinge';

function Card(
  props: { title: string } & WithSlots<{
    default?: JNode;
    footer?: JNode;
  }>,
) {
  return (
    <section>
      <h2>{props.title}</h2>
      <div>{props.children}</div>
      <footer>{props['slot:footer']}</footer>
    </section>
  );
}
```

## Pass named content

Supply named content as a `slot:name` component attribute. Keep layout in the container component and let its caller provide the content.

```tsx
<Card title="Releases" slot:footer={<a href="/releases">View all</a>}>
  <p>Your application is ready.</p>
</Card>
```

## Scoped slots

A function slot can receive data provided by its child component. Use `WithSlots` to describe those arguments. See the complete definitions, invocations, and forwarding patterns in the [slots example](/examples/slots/).

## Optional content

A fallback such as `props.children ?? <p>No content yet</p>` provides useful default content without requiring every caller to pass a slot.
