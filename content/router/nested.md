---
title: 嵌套布局与匹配
description: 把共享结构保留在父页面。
group: 路由
---

## 父布局与子页面

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

子路径相对于父级，不写开头的 `/`。不带 path 的子路由是 index，每组 children 最多一个。父组件不变时保留布局，子出口渲染相应页面。

## 路径匹配

| 写法       | 示例              |
| ---------- | ----------------- |
| 静态路径   | `/about`          |
| 字符串参数 | `/users/:name`    |
| 数字参数   | `/users/:id<num>` |
| 通配符     | `/files/*`        |

同优先级按声明顺序匹配。将 `/users/new` 放在 `/users/:name` 前面。数字参数只接受数字字符，不接受负数与小数。

## 重定向

```ts
{ path: '/old', redirectTo: '/projects' }
```

父路由可通过 `redirectChild: 'overview'` 默认进入子页。重定向替换当前历史记录，注意避免循环。

## 未匹配页面

用 `/*` 提供全局 fallback。`/files/*` 不匹配 `/files` 自身，必要时单独声明。通配符只能放在最后，且不能用于有 children 的父路由。
