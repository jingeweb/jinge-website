---
title: Ref 與生命週期
description: 在正確的時間接入 DOM 與外部資源。
group: 元件
---

## 掛載與銷燬

```tsx
import { onMount, onUnmount, ref } from 'jinge';

function CanvasPanel() {
  const canvas = ref<HTMLCanvasElement>();
  onMount(() => {
    const ctx = canvas.value?.getContext('2d');
    ctx?.fillRect(0, 0, 40, 40);
  });
  onUnmount(() => {
    // 釋放元件擁有的外部資源
  });
  return <canvas ref={canvas} width={200} height={100} />;
}
```

在元件初始化期間註冊生命週期函式。需要讀取已經插入頁面的 DOM 時使用 `onMount()`。

## 清理副作用

`onMount()` 可以返回清理函式。事件監聽器、定時器、圖表例項和訂閱，都應在元件銷燬時釋放。

```ts
onMount(() => {
  const timer = window.setInterval(refresh, 1000);
  return () => window.clearInterval(timer);
});
```

## 元件引用

DOM Ref 用於持有節點；子元件可通過 `expose()` 暴露明確的方法集合。避免讓父元件依賴子元件的內部 DOM 結構。

## 第三方庫

[整合 ECharts](/examples/integrated-with-echarts/)展示了掛載圖表與釋放例項的具體寫法；[Ref 與生命週期](/examples/ref-and-life-cycle/)示例展示 DOM 引用和元件引用。
