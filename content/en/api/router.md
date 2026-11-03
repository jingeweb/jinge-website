---
title: Router API
description: Create routes, read URL state, and navigate.
group: API
---

## createRouter

`routes` is required. `mode` defaults to `html5` and may be `hash`; `baseHref` defaults to `/`. See [Router basics](/router/overview/).

```ts
const router = createRouter({
  mode: 'html5',
  baseHref: '/',
  routes: [{ path: '/', component: Home }],
});
```

## Router / RouterView

`Router` provides context and `RouterView` renders the component matched at its current depth. An outlet in a parent layout renders the next level.

```tsx
<Router router={router}>
  <RouterView />
</Router>
```

## RouterHref

Render a native link. Supported properties are `to`, `className`, `activeClass`, and `exactActiveClass`; arbitrary anchor attributes are not forwarded. Use canonical paths without a query for active matching.

```tsx
<RouterHref to="/projects" activeClass="active" exactActiveClass="exact">
  Projects
</RouterHref>
```

## RouterLink

Use a function slot to customize the anchor. Slot state includes `href`, `active`, and `exactActive`. Options include `replace`, `open`, `noEvent`, and `noActive`; consult the router README for their full behavior.

## useNavigate

Read the navigation function during component initialization and call it from event handlers. String targets must be route paths starting with `/`. Parent-relative navigation is not implemented.

```ts
const navigate = useNavigate();
navigate('/users/2?tab=activity');
navigate('/login', { replace: true });
navigate(-1);
```

## useParams / useQuery

Both return reactive VMs. The generic type is only a static annotation; numeric conversion is determined by `<num>` in the route pattern. Query values are strings, and the first repeated value wins. Mutating these objects does not navigate or change the URL.

```ts
const params = useParams<{ id: number }>();
const query = useQuery();
```
