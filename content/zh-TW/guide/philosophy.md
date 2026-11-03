---
title: 理念與歷史
description: 沒有指令，沒有模板 DSL，只有元件。
group: 開始
---

## 一切皆是元件

Jinge 裡沒有「指令」這個詞。

`if` 和 `for` 在多數框架中是模板指令、巨集或語法糖，Jinge 把它們做成了**元件**。你在 TSX 裡寫的條件和迴圈，編譯後就是實實在在的元件呼叫：

| 你寫下的                                      | 編譯器把它變成                                       |
| --------------------------------------------- | ---------------------------------------------------- |
| `cond ? <A /> : <B />`                        | `<If expect={cond} slot:else={<B />}><A /></If>`     |
| `list.map((item) => <Row key={item.id} … />)` | `<For loop={list} key={item.id}>{(each) => …}</For>` |

`<If>` 和 `<For>` 就是 `jinge` 直接匯出的普通元件，介面也完全公開：

```tsx
<If expect={state.show} slot:else={'顯示'}>
  隱藏
</If>

<For loop={state.items} key="id">
  {(each) => <Row item={each.data} index={each.index} />}
</For>
```

於是整個框架的心智模型收斂到三樣東西：**元件、屬性、插槽**。沒有指令，沒有模板 DSL，也沒有需要額外記憶的語法規則 —— 你寫的 TSX 就是最終的元件樹。

更重要的是，控制流不是不可替換的語言原語。內建實作撐不住你的場景時，可以寫自己的控制流元件顯式使用；代價是放棄對應的語法糖，並自行承擔 `For` 的 key 復用與 diff。我們計畫讓編譯器支援指定語法糖的落點，到那時「不滿意就自己實作」才算真正閉環。

## 標準 TSX，沒有虛擬 DOM

模板就是 TSX，因此 TypeScript 的型別檢查、IDE 補全、重構工具全部可用，元件的屬性和插槽都有型別約束。執行時用 `vm()` 把普通物件包成 Proxy，改屬性即更新介面；沒有虛擬 DOM，也就沒有 diff 與重新渲染的一整套開銷。

```tsx
function App() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>Count: {state.count}</button>;
}
```

## 輕是可以量化的

| 項目                 | 體積                   |
| -------------------- | ---------------------- |
| 框架庫產物（壓縮後） | 約 31 KB               |
| Hello World 建置產物 | 約 3 KB（gzip 1.4 KB） |
| HMR 執行時程式碼     | 約 100 行              |

體積不是省在功能上：內建多語系、泛型元件、插槽與上下文都在核心裡，`jinge-router` 單獨提供路由能力。

## 編譯器用 Rust 寫

`jinge-compiler` 基於 SWC，用 Rust 實作 TSX 到 DOM 操作的轉換，同時提供 Vite 外掛與多語系工具鏈。編譯器負責把模板編譯成精確的 DOM 與監聽邏輯：保留預設文字的多語系提取、條件與迴圈的元件化，都發生在這一步。

## 演進歷史

幾個關鍵轉折，按時間排列：

| 時間    | 變化                                                                                                                                              | 提交                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 2019.02 | 首個提交，框架與範例倉庫 [jinge-demos](https://github.com/jingeweb/jinge-demos) 同日起步                                                          | [`3995937`](https://github.com/jingeweb/jinge/commit/3995937f47b27d058c9c4360455e577d707e0dd7)               |
| 2020.01 | [jinge-material](https://github.com/jingeweb/jinge-material) 發布 1.0.0，元件庫首次上線，附帶完整[文件站點](https://jingeweb.github.io/material/) | [`287422e`](https://github.com/jingeweb/jinge-material/commit/287422eabf206b79ae36aefef2e47ddece1bed9a)      |
| 2020.04 | [jinge-router](https://github.com/jingeweb/jinge-router) 獨立成庫                                                                                 | [`45fdb8e`](https://github.com/jingeweb/jinge-router/commit/45fdb8e9c4ac986c9dfcb5f2c359ba1f9428793d)        |
| 2020.05 | 用 TypeScript 重寫框架（v2）                                                                                                                      | [`e57bfe8`](https://github.com/jingeweb/jinge/commit/e57bfe837ac8d7c02c68f9afbc013bca0915d6a5)               |
| 2020.06 | v3.0，跟進 webpack 5                                                                                                                              | [`d6a891e`](https://github.com/jingeweb/jinge/commit/d6a891ef1df2bd78ad14dac62046f3724772f329)               |
| 2022.05 | 模板編譯器獨立成倉庫：TypeScript 實作，模板是類 Angular 的 HTML 檔                                                                                | [`46f4720`](https://github.com/jingeweb/jinge-compiler/commit/46f4720ab9ac80d7f2114301b000f93ba6e006d9)      |
| 2022.08 | [jinge-material](https://github.com/jingeweb/jinge-material) 停止維護，最後一個版本 3.0.3。**已過期**                                             | [`e4a3d51`](https://github.com/jingeweb/jinge-material/commit/e4a3d517c5f1431da4bc595b693712f505b88b5b)      |
| 2024.07 | 編譯器用 Rust 重寫，模板從 HTML 改為標準 TSX                                                                                                      | [`51fda81`](https://github.com/jingeweb/jinge-rust-compiler/commit/51fda8173ff7ff0a2779e5e67a295e905c66c02d) |
| 2025.02 | [jinge-antd](https://jinge-antd.embjs.com) 元件庫開始實施，進行中                                                                                 | —                                                                                                            |
| 2026.11 | 在 AI 加持下完成 [jinge-antd](https://jinge-antd.embjs.com) 元件庫並發布文件站，發布框架官網與文件（[jinge.embjs.com](https://jinge.embjs.com)）  | —                                                                                                            |

兩次語言級重寫（框架一次、編譯器一次），一次模板範式遷移（HTML → TSX），這條線從 2019 年一直走到現在。
