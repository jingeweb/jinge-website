---
title: 组件与 Props
description: 用函数组合界面，让类型约束贯穿组件边界。
group: 组件
---

## 定义函数组件

```tsx
function Greeting(props: { name: string }) {
  return <h2>你好，{props.name}。</h2>;
}

function App() {
  const state = vm({ name: 'Jinge' });
  return <Greeting name={state.name} />;
}
```

为 Props 声明类型，编辑器就能检查传入属性。模板中的动态属性经编译后连接到子组件。

## 向父组件报告事件

自定义事件可以通过函数属性传递：

```tsx
function Action(props: { onConfirm: (value: string) => void }) {
  return <button on:click={() => props.onConfirm('confirmed')}>确认</button>;
}
```

## 泛型组件

组件函数可以使用 TypeScript 泛型约束数据与回调之间的关系。插槽也可以携带类型，详见[插槽](/guide/slots/)。

## 状态放在哪里

组件内部的 `vm()` 属于当前实例。多个组件共享的数据，可以提升到父组件后传递，也可以用模块级 VM 或 Context 组织。共享状态的生命周期需要由应用明确管理。

## 初始化与更新

组件函数负责初始化，而模板内的响应式表达式负责后续更新。请求数据等操作如果依赖变化的 Props，应使用 `watch()`，而非期待整个组件函数重新执行。
