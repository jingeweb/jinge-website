---
title: 元件與 Props
description: 用函式組合介面，讓型別約束貫穿元件邊界。
group: 元件
---

## 定義函式元件

```tsx
function Greeting(props: { name: string }) {
  return <h2>你好，{props.name}。</h2>;
}

function App() {
  const state = vm({ name: 'Jinge' });
  return <Greeting name={state.name} />;
}
```

為 Props 宣告型別，編輯器就能檢查傳入屬性。模板中的動態屬性經編譯後連線到子元件。

## 向父元件報告事件

自定義事件可以通過函式屬性傳遞：

```tsx
function Action(props: { onConfirm: (value: string) => void }) {
  return <button on:click={() => props.onConfirm('confirmed')}>確認</button>;
}
```

## 泛型元件

元件函式可以使用 TypeScript 泛型約束資料與回撥之間的關係。插槽也可以攜帶型別，詳見[插槽](/guide/slots/)。

## 狀態放在哪裡

元件內部的 `vm()` 屬於當前例項。多個元件共享的資料，可以提升到父元件後傳遞，也可以用模組級 VM 或 Context 組織。共享狀態的生命週期需要由應用明確管理。

## 初始化與更新

元件函式負責初始化，而模板內的響應式表示式負責後續更新。請求資料等操作如果依賴變化的 Props，應使用 `watch()`，而非期待整個元件函式重新執行。
