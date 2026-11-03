---
title: 模板與渲染
description: 用 TSX 描述結構、條件和列表。
group: 基礎
---

## 屬性與事件

```tsx
<button disabled={state.busy} on:click={() => submit()}>
  {state.busy ? '提交中' : '提交'}
</button>
```

可以使用 TSX 表示式描述動態文本。事件推薦採用 `on:click`、`on:input` 形式，方便區分事件與普通元件屬性。

## 條件渲染

```tsx
{
  state.visible && <p>現在可以看到我。</p>;
}
{
  state.loggedIn ? <Dashboard /> : <Login />;
}
```

編譯器將模板中的條件表示式轉換為響應式渲染邏輯。複雜情況也可以使用內建 `If` 元件，參考[條件渲染示例](/examples/if/)。

## 列表渲染

```tsx
<ul>
  {state.items.map((item) => (
    <li key={item.id}>{item.title}</li>
  ))}
</ul>
```

模板裡的 `.map()` 會由編譯器處理為列表渲染。選擇穩定的業務 ID，有助於列表重排時匹配元素。Jinge 的 `key` 主要服務於這種編譯轉換，不應套用其他框架所有場景下的 key 語義。

## 片段與巢狀元件

元件可返回片段，避免引入額外包裹元素。用首字母大寫的名稱引用元件，並按 TypeScript 的常規方式匯入。

```tsx
function App() {
  return (
    <>
      <Header />
      <main>
        <Content />
      </main>
    </>
  );
}
```
