---
title: 從 Vue / React 出發
description: 熟悉的語法，需要重新認識的更新模型。
group: 開始
---

## 與 Vue 相近的部分

Jinge 用 Proxy 包裝物件，通過修改響應式屬性更新介面。`vm()` 的上手體驗接近 Vue 的 `reactive()`；但 Jinge 使用 TSX 模板，具體編譯規則與 API 不同。

## 與 React 相近的部分

用函式定義元件，TSX 將結構與邏輯放在一起，Props 使用 TypeScript 宣告。Jinge 不使用虛擬 DOM，也不通過狀態更新重複執行整個元件函式。

| 需求     | Jinge 的做法                     |
| -------- | -------------------------------- |
| 定義狀態 | `const state = vm({ count: 0 })` |
| 更新狀態 | `state.count++`                  |
| 監聽變化 | `watch(state, 'count', handler)` |
| 訪問 DOM | `ref()` 與 `onMount()`           |
| 元件組合 | Props 與 `WithSlots`             |
| 路由引數 | `useParams()` 返回響應式 VM      |

## 一個計數器

```tsx
function Counter() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>{state.count}</button>;
}
```

## 三個常見誤區

- 不要把 `const { count } = state` 得到的數字當作持續響應的引用。
- 不要期待元件函式在每次狀態更新時重新執行。需要副作用時使用 `watch()`。
- `style` 當前是字串；具名插槽通過 `slot:名稱` 屬性傳入。不要直接照搬 React 的樣式物件或 Vue 的模板指令。

先執行[基礎示例](/examples/)，再對照[模板與渲染](/guide/templates/)理解編譯邊界。
