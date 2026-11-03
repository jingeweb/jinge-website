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

> 本節內容稍後補齊。
