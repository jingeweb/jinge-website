---
title: Forms and events
description: Make the relationship between inputs and state explicit.
group: Essentials
---

## Controlled inputs

The template displays values from state, while event handlers write changes back. Convert numeric inputs explicitly with `Number()` when appropriate. Validation rules belong to your application.

```tsx
const state = vm({ name: '', accepted: false });

<input
  value={state.name}
  on:input={(event) => state.name = event.target.value}
/>
<input
  type="checkbox"
  checked={state.accepted}
  on:change={(event) => state.accepted = event.target.checked}
/>
```

## Submit a form

Prevent the native submission when handling a form in your application. Keep native label associations and keyboard behavior. Event parameter types follow the corresponding HTML element.

```tsx
<form
  on:submit={(event) => {
    event.preventDefault();
    save(state.name);
  }}
>
  <label htmlFor="name">Name</label>
  <input id="name" value={state.name} on:input={(event) => (state.name = event.target.value)} />
  <button type="submit">Save</button>
</form>
```

## More controls

The [form inputs example](/examples/form-input/) covers textarea, select, and multiple selections. The [form example](/examples/form/) demonstrates a complete reactive data summary.
