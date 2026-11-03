---
title: 內建元件
description: 控制結構、動態內容和過渡。
group: API
---

## If

用於條件渲染。日常模板可使用三元表示式與 `&&`，由編譯器生成相應的控制結構。檢視[條件示例](/examples/if/)。

```tsx
<If expect={state.visible} slot:else={<p>內容已隱藏</p>}>
  <p>現在可以看到我。</p>
</If>
```

`expect` 為布林值；預設插槽在真分支渲染，`slot:else` 是可選的假分支。切換時舊分支的元件會被銷燬。

## For

```tsx
<For loop={state.items}>{(item) => <p>{item.data.title}</p>}</For>
```

遍歷響應式列表。模板 `.map()` 是更簡潔的寫法；編譯器識別根元素 key 以配置列表匹配。

| 屬性 / 插槽值              | 含義                                      |
| -------------------------- | ----------------------------------------- |
| loop                       | 陣列，也可為 null 或 undefined            |
| key                        | 資料欄位名，或匯出的 KEY_INDEX / KEY_DATA |
| item.data                  | 當前資料項                                |
| item.index                 | 當前索引                                  |
| item.isFirst / item.isLast | 是否首項 / 末項                           |

```tsx
<For loop={state.items} key="id">
  {(item) => (
    <p>
      {item.index + 1}. {item.data.title}
    </p>
  )}
</For>
```

穩定的業務 ID 有助於列表重排時保留對應節點與輸入狀態。

## Dynamic

```tsx
<Dynamic fc={state.current} title={state.title} />
```

`fc` 為元件函式。型別改變會重建例項，其他屬性傳遞給當前元件。

## lazy / Lazy

```tsx
const Panel = lazy(() => import('./panel').then((m) => m.Panel), {
  'slot:loading': <p>正在載入</p>,
  'slot:error': (props) => <p>{props.error.message}</p>,
});
```

`lazy()` 建立可使用的非同步元件，底層由 `Lazy` 管理載入、錯誤與銷燬。loader 必須返回元件函式。

## Portal

用於把內容渲染到目標容器。它解決掛載位置問題；完整彈層仍需要處理焦點與鍵盤行為。

```tsx
<Portal target={document.body}>
  <div role="status">內容會出現在目標容器中。</div>
</Portal>
```

`target` 是可選的 HTMLElement，預設 document.body，在初始化時讀取。Portal 中的內容隨所屬元件銷燬。

## Transition / TransitionGroup

元件進入離開與列表動畫依賴對應 CSS 過渡類。參閱[過渡示例的完整原始碼](/examples/transition/)，把類名、時長和列表結構一起配置。

| Transition 屬性                     | 含義                               |
| ----------------------------------- | ---------------------------------- |
| isEnter                             | 為真時進入，為假時離開             |
| appear                              | 首次渲染是否應用動畫，預設 false   |
| destroyAfterLeave                   | 離開結束後是否銷燬內容，預設 false |
| enterClass / leaveClass             | 對應進入與離開的目標樣式類         |
| enterActiveClass / leaveActiveClass | 動畫執行期間的啟用樣式類           |

可通過 `on:beforeEnter`、`on:afterEnter`、`on:enterCancelled`、`on:beforeLeave`、`on:afterLeave`、`on:leaveCancelled` 註冊回撥。內容應只有一個根 Element。`TransitionGroup` 結合列表的 loop、key 與過渡類處理每個列表項。
