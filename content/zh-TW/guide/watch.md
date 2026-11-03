---
title: 偵聽與副作用
description: 在模板之外響應資料變化。
group: 進階
---

## 元件內偵聽

```tsx
import { vm, watch } from 'jinge';

function Search() {
  const state = vm({ query: '', status: '' });
  watch(state, 'query', (value) => {
    state.status = `正在搜尋：${value}`;
  });
  return <input value={state.query} on:input={(event) => (state.query = event.target.value)} />;
}
```

`watch()` 必須在元件初始化期間呼叫，偵聽會隨元件銷燬自動解除。`immediate: true` 可以立即執行回撥。

## 路徑與深度監聽

```ts
watch(state, ['user', 'name'], (name) => console.log(name));
watch(state, (value) => console.log(value), { immediate: true });
```

路徑監聽面向明確的屬性；物件監聽用於關注整體的深層變化。避免在回撥中無條件修改同一個被監聽屬性。

## 元件外偵聽

`vmWatch()` 可在元件之外使用，並返回解除監聽的函式。使用方應在合適的生命週期呼叫它。

```ts
const stop = vmWatch(state, 'count', (value) => console.log(value));
// 不再需要時
stop();
```

## 請求競態

請求依賴可變狀態時，需要應用處理過期響應，例如使用 AbortController 或請求序號。更多監聽與路徑通知行為見[資料偵聽示例](/examples/watch/)。
