---
title: 巢狀佈局與匹配
description: 把共享結構保留在父頁面。
group: 路由
---

## 父佈局與子頁面

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

子路徑相對於父級，不寫開頭的 `/`。不帶 path 的子路由是 index，每組 children 最多一個。父元件不變時保留佈局，子出口渲染相應頁面。

## 路徑匹配

| 寫法     | 示例              |
| -------- | ----------------- |
| 靜態路徑 | `/about`          |
| 字串引數 | `/users/:name`    |
| 數字引數 | `/users/:id<num>` |
| 萬用字元 | `/files/*`        |

同優先順序按宣告順序匹配。將 `/users/new` 放在 `/users/:name` 前面。數字引數只接受數字字元，不接受負數與小數。

## 重定向

```ts
{ path: '/old', redirectTo: '/projects' }
```

父路由可通過 `redirectChild: 'overview'` 預設進入子頁。重定向替換當前歷史記錄，注意避免迴圈。

## 未匹配頁面

用 `/*` 提供全域性 fallback。`/files/*` 不匹配 `/files` 自身，必要時單獨宣告。萬用字元只能放在最後，且不能用於有 children 的父路由。
