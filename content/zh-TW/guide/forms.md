---
title: 表單與事件
description: 讓輸入、校驗和狀態之間的關係清晰可見。
group: 基礎
---

## 受控輸入

```tsx
const state = vm({ name: '', accepted: false });

<input
  value={state.name}
  on:input={(event) => state.name = event.target.value}
/>
<input
  type="checkbox"
  checked={state.accepted}
  on:change={(event) => state.accepted = event.target.checked}
/>
```

模板負責從狀態顯示值，事件負責寫回資料。數字輸入可以通過 `Number()` 顯式轉換；校驗規則由應用決定。

## 提交表單

```tsx
<form
  on:submit={(event) => {
    event.preventDefault();
    save(state.name);
  }}
>
  <label htmlFor="name">名稱</label>
  <input id="name" value={state.name} on:input={(event) => (state.name = event.target.value)} />
  <button type="submit">儲存</button>
</form>
```

原生表單元素保持正常的標籤關聯與鍵盤操作。事件引數型別由對應元素提供。

## 更多控制元件

檢視[表單輸入](/examples/form-input/)瞭解 textarea、select 與多選；檢視[表單組合](/examples/form/)瞭解完整資料彙總。
