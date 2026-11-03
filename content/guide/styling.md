---
title: 样式
description: 使用原生 CSS、className 与 CSS 变量。
group: 基础
---

## 引入 CSS

```ts
import './style.css';
```

Jinge 当前没有内置 scoped CSS。可以用组件类名前缀组织样式，也可以使用 Vite 提供的 CSS Modules。

## 组合类名

```tsx
import { cx } from 'jinge';

<div className={cx('panel', state.active && 'active')} />;
```

`className` 编译后对应 DOM 的 `class` 属性。`cx()` 便于组合条件类名。

## 动态样式

`style` 使用字符串，而不是 React 风格的样式对象：

```tsx
<div style={`width:${state.progress}%;--accent:${state.color}`} />
```

CSS 变量适合把动态数据传给样式层。数值单位需要显式书写。查看[样式示例](/examples/styling/)操作主题、圆角与进度条。
