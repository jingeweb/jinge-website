---
title: Parameters, query, and navigation
description: Reuse a page as its URL data changes.
group: Router
---

## Read reactive parameters

Declare `/users/:id<num>` to convert id to a number at runtime. Parameter state includes ancestors, with child values taking precedence when names repeat.

```tsx
function User() {
  const params = useParams<{ id: number }>();
  const query = useQuery();
  watch(params, 'id', (id) => loadUser(id), { immediate: true });
  return (
    <p>
      User {params.id} · {query.tab ?? 'overview'}
    </p>
  );
}
```

## Parameter changes reuse the page

Changing only parameters or query values reuses matched components. Keep reading VM properties in the template, and watch those properties for effects such as loading data.

## Navigate

`navigate(-1)` goes back and `navigate(1)` goes forward. Pass `{ replace: true }` to replace a history entry. Use a normal anchor for external URLs.

```tsx
const navigate = useNavigate();
<button on:click={() => navigate('/users/2?tab=activity')}>User 2</button>;
```

## Query boundaries

`useQuery()` returns a router-wide VM. Values are decoded with URLSearchParams, repeated keys use the first value, and missing keys are undefined. Assigning a property changes the object but not the address; use navigation instead.
