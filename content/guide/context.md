---
title: 上下文 Context
description: 跨组件层级共享配置与服务。
group: 组件
---

## 提供与读取

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
    <button on:click={() => (theme.dark = !theme.dark)}>{theme.dark ? '深色' : '浅色'}</button>
  );
}
```

Context 由组件祖先提供。用 Symbol 降低不同模块间键名碰撞的可能。

## 响应式来自值本身

Context 负责传递值；将 VM 放入 Context，后代组件便可监听该 VM 的属性。它不是一个额外的状态管理系统。

## 合适的边界

主题、会话信息和服务实例适合通过 Context 提供。优先用 Props 表达直接的父子数据依赖。完整交互见[上下文示例](/examples/context/)。
