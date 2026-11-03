---
title: 模板与渲染
description: 用 TSX 描述结构、条件和列表。
group: 基础
---

## 属性与事件

```tsx
<button disabled={state.busy} on:click={() => submit()}>
  {state.busy ? '提交中' : '提交'}
</button>
```

可以使用 TSX 表达式描述动态文本。事件推荐采用 `on:click`、`on:input` 形式，方便区分事件与普通组件属性。

## 条件渲染

```tsx
{
  state.visible && <p>现在可以看到我。</p>;
}
{
  state.loggedIn ? <Dashboard /> : <Login />;
}
```

编译器将模板中的条件表达式转换为响应式渲染逻辑。复杂情况也可以使用内置 `If` 组件，参考[条件渲染示例](/examples/if/)。

## 列表渲染

```tsx
<ul>
  {state.items.map((item) => (
    <li key={item.id}>{item.title}</li>
  ))}
</ul>
```

模板里的 `.map()` 会由编译器处理为列表渲染。选择稳定的业务 ID，有助于列表重排时匹配元素。Jinge 的 `key` 主要服务于这种编译转换，不应套用其他框架所有场景下的 key 语义。

## 片段与嵌套组件

组件可返回片段，避免引入额外包裹元素。用首字母大写的名称引用组件，并按 TypeScript 的常规方式导入。

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
