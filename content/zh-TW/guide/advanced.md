---
title: 動態元件與動畫
description: 按需載入、切換元件與過渡效果。
group: 進階
---

## 動態元件

```tsx
import { Dynamic, vm, type FC } from 'jinge';

const state = vm<{ current: FC }>({ current: Overview });
<Dynamic fc={state.current} />;
```

`Dynamic` 在元件型別變化時銷燬舊例項、建立新例項。想保留資料，應把狀態提升到外層；框架沒有內建 KeepAlive。

## 非同步元件

```tsx
import { lazy } from 'jinge';

const Settings = lazy(() => import('./Settings').then((module) => module.Settings), {
  'slot:loading': <p>正在載入…</p>,
  'slot:error': (props) => <p>{props.error.message}</p>,
});
```

載入函式應返回元件函式。檢視[動態元件示例](/examples/dynamic-components/)體驗載入狀態和例項重建。

## 過渡與列表動畫

`Transition` 配合 CSS 管理進入和離開效果；`TransitionGroup` 用於列表場景。使用真實的業務時長，並尊重使用者的減少動態效果設定。完整樣式與元件引數見[過渡動畫示例](/examples/transition/)。

## Portal

Portal 可將內容渲染到指定 DOM 容器，適合彈層等場景。焦點管理、鍵盤關閉和滾動鎖定仍由元件負責，詳見[內建元件 API](/api/components/)。
