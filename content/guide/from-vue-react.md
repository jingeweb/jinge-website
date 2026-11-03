---
title: 从 Vue / React 出发
description: 熟悉的语法，需要重新认识的更新模型。
group: 开始
---

## 与 Vue 相近的部分

Jinge 用 Proxy 包装对象，通过修改响应式属性更新界面。`vm()` 的上手体验接近 Vue 的 `reactive()`；但 Jinge 使用 TSX 模板，具体编译规则与 API 不同。

## 与 React 相近的部分

用函数定义组件，TSX 将结构与逻辑放在一起，Props 使用 TypeScript 声明。Jinge 不使用虚拟 DOM，也不通过状态更新重复执行整个组件函数。

| 需求     | Jinge 的做法                     |
| -------- | -------------------------------- |
| 定义状态 | `const state = vm({ count: 0 })` |
| 更新状态 | `state.count++`                  |
| 监听变化 | `watch(state, 'count', handler)` |
| 访问 DOM | `ref()` 与 `onMount()`           |
| 组件组合 | Props 与 `WithSlots`             |
| 路由参数 | `useParams()` 返回响应式 VM      |

## 一个计数器

```tsx
function Counter() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>{state.count}</button>;
}
```

## 三个常见误区

- 不要把 `const { count } = state` 得到的数字当作持续响应的引用。
- 不要期待组件函数在每次状态更新时重新执行。需要副作用时使用 `watch()`。
- `style` 当前是字符串；具名插槽通过 `slot:名称` 属性传入。不要直接照搬 React 的样式对象或 Vue 的模板指令。

先运行[基础示例](/examples/)，再对照[模板与渲染](/guide/templates/)理解编译边界。
