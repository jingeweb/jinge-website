---
title: 路由入門
description: 為單頁應用建立清晰的頁面結構。
group: 路由
---

## 安裝

```sh
pnpm add jinge-router
```

應用 TSX 仍需要 Jinge 編譯器。路由庫與執行時應使用相容版本。

## 定義頁面

```tsx
import { Router, RouterView, RouterHref, createRouter } from 'jinge-router';

function Home() {
  return <h1>首頁</h1>;
}
function About() {
  return <h1>關於</h1>;
}

const router = createRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ],
});

function App() {
  return (
    <Router router={router}>
      <nav>
        <RouterHref to="/about">關於</RouterHref>
      </nav>
      <RouterView />
    </Router>
  );
}
```

## 導航狀態

`RouterHref` 的 `activeClass` 可讓當前欄目持續高亮；`exactActiveClass` 表示精確匹配。需要自定義連結結構時使用 RouterLink。

## 頁面在哪裡執行

History 模式使用正常路徑，但需要靜態入口或伺服器回退；hash 模式無需處理伺服器子路由。檢視[構建與部署](/guide/deployment/)。

## 試一試

[路由互動演示](/examples/router-navigation/)提供使用者引數、query、巢狀佈局和歷史前進後退。位址列隻影響預覽內部，便於觀察頁面切換。
