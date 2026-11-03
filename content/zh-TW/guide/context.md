---
title: 上下文 Context
description: 跨元件層級共享配置與服務。
group: 元件
---

## 提供與讀取

```tsx
import { context, vm } from 'jinge';

const ThemeKey = Symbol('theme');

function App() {
  const theme = vm({ dark: false });
  context(ThemeKey, theme);
  return <Toolbar />;
}

function Toolbar() {
  const theme = context<{ dark: boolean }>(ThemeKey);
  return (
    <button on:click={() => (theme.dark = !theme.dark)}>{theme.dark ? '深色' : '淺色'}</button>
  );
}
```

Context 由元件祖先提供。用 Symbol 降低不同模組間鍵名碰撞的可能。

## 響應式來自值本身

Context 負責傳遞值；將 VM 放入 Context，後代元件便可監聽該 VM 的屬性。它不是一個額外的狀態管理系統。

## 合適的邊界

主題、會話資訊和服務例項適合通過 Context 提供。優先用 Props 表達直接的父子資料依賴。完整互動見[上下文示例](/examples/context/)。
