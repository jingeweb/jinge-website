---
title: Nested layouts and matching
description: Keep shared structure in a parent page.
group: Router
---

## Parent layouts and child pages

Child paths are relative to the parent and omit the leading `/`. A child without a path is the index route; each children array may contain at most one index. A matching parent keeps its layout while the child outlet displays the next page.

```tsx
function ProjectsLayout() {
  return (
    <section>
      <h1>Projects</h1>
      <RouterView />
    </section>
  );
}

const router = createRouter({
  routes: [
    {
      path: '/projects',
      component: ProjectsLayout,
      children: [{ component: ProjectOverview }, { path: ':id<num>', component: Project }],
    },
  ],
});
```

## Path matching

| Pattern           | Example           |
| ----------------- | ----------------- |
| Static            | `/about`          |
| String parameter  | `/users/:name`    |
| Numeric parameter | `/users/:id<num>` |
| Wildcard          | `/files/*`        |

Equal-priority routes match in declaration order. Put `/users/new` before `/users/:name`. Numeric parameters only accept digits, without minus signs or decimal points.

## Redirects

A parent can use `redirectChild: 'overview'` as its default child destination. Redirects replace the current history entry. Avoid redirect cycles.

```ts
{ path: '/old', redirectTo: '/projects' }
```

## Unmatched pages

Use `/*` for a global fallback. `/files/*` does not match `/files` itself, so declare that separately if needed. A wildcard must be the last segment and cannot belong to a route with children.
