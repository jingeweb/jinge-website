---
title: 響應式資料
description: 用 vm 描述狀態，讓資料變化抵達介面。
group: 基礎
---

## 建立狀態

`vm()` 將物件或陣列包裝為響應式 ViewModel。模板直接讀取它的屬性，事件處理函式直接修改屬性。

```tsx
import { vm } from 'jinge';

export function Counter() {
  const state = vm({ count: 0, user: { name: 'Jinge' } });
  return (
    <section>
      <p>
        {state.user.name}: {state.count}
      </p>
      <button on:click={() => state.count++}>增加</button>
    </section>
  );
}
```

## 保留屬性訪問

```ts
const state = vm({ count: 0 });
const count = state.count; // 普通數字快照，不是響應式引用
state.count++;
```

在模板中使用 `state.count`，而不是期待解構出來的數字自動更新。元件函式是初始化邏輯；它不會因為每次狀態變化重新執行。

## 陣列變更

對 VM 陣列使用 `push()`、`splice()` 等操作，列表會收到變更通知。檢視[列表示例](/examples/list-rendering/)理解插入、刪除與重排。

## 模板之外的副作用

模板裡的屬性訪問由編譯器處理；資料請求、日誌等副作用使用[watch](/guide/watch/)。不要把元件初始化時計算出的普通變數當成自動重新計算的狀態。

## 原始資料與邊界

`vmRaw()` 可取出原始資料；直接修改原始物件不會經過 Proxy 通知。`vmIgnore()` 用於標記不需要轉換為 VM 的物件。對於複雜資料結構，先用小型示例驗證通知行為。

迴圈引用受到保護，不會無限傳播；但通知不保證能沿同一環反覆繞行。監聽環內物件時，直接監聽目標物件上的屬性。
