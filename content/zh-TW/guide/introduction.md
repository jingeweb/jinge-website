---
title: 認識 Jinge
description: 標準 TSX，輕巧的響應式應用。
group: 開始
---

## 寫你熟悉的 TypeScript

Jinge 是面向瀏覽器介面的 MVVM 框架。元件由函式定義，使用標準 TSX 描述模板，使用 `vm()` 建立響應式資料。執行時基於 ES Proxy，模板經編譯器轉換為 DOM 操作與資料監聽，不使用虛擬 DOM。

```tsx
import { bootstrap, vm } from 'jinge';

function App() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>Count: {state.count}</button>;
}

bootstrap(App, document.getElementById('app')!);
```

## 三個協作的部分

| 包             | 職責                                                 |
| -------------- | ---------------------------------------------------- |
| jinge          | 響應式資料、元件、DOM 更新與生命週期                 |
| jinge-compiler | 基於 Rust / SWC 編譯 TSX，提供 Vite 外掛與國際化工具 |
| jinge-router   | SPA 導航、巢狀佈局、響應式路徑引數與 query           |

## 適合怎樣的專案

從獨立介面、小型工具到有多個頁面和共享元件的 SPA，都可以從函式元件與響應式狀態開始組織。Jinge 當前的工程整合以 Vite 為主。元件庫、除錯工具和第三方適配應按專案需要評估。

## 接下來

從[快速開始](/guide/quick-start/)搭建專案，再通過[互動示例](/examples/)學習具體功能。熟悉 Vue 或 React，可以先閱讀[遷移心智模型](/guide/from-vue-react/)。
