---
title: 樣式
description: 使用原生 CSS、className 與 CSS 變數。
group: 基礎
---

## 引入 CSS

```ts
import './style.css';
```

Jinge 當前沒有內建 scoped CSS。可以用元件類名字首組織樣式，也可以使用 Vite 提供的 CSS Modules。

## 組合類名

```tsx
import { cx } from 'jinge';

<div className={cx('panel', state.active && 'active')} />;
```

`className` 編譯後對應 DOM 的 `class` 屬性。`cx()` 便於組合條件類名。

## 動態樣式

`style` 使用字串，而不是 React 風格的樣式物件：

```tsx
<div style={`width:${state.progress}%;--accent:${state.color}`} />
```

CSS 變數適合把動態資料傳給樣式層。數值單位需要顯式書寫。檢視[樣式示例](/examples/styling/)操作主題、圓角與進度條。
