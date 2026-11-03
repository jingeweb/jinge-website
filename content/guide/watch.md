---
title: 侦听与副作用
description: 在模板之外响应数据变化。
group: 进阶
---

## 组件内侦听

```tsx
import { vm, watch } from 'jinge';

function Search() {
  const state = vm({ query: '', status: '' });
  watch(state, 'query', (value) => {
    state.status = `正在搜索：${value}`;
  });
  return <input value={state.query} on:input={(event) => (state.query = event.target.value)} />;
}
```

`watch()` 必须在组件初始化期间调用，侦听会随组件销毁自动解除。`immediate: true` 可以立即执行回调。

## 路径与深度监听

```ts
watch(state, ['user', 'name'], (name) => console.log(name));
watch(state, (value) => console.log(value), { immediate: true });
```

路径监听面向明确的属性；对象监听用于关注整体的深层变化。避免在回调中无条件修改同一个被监听属性。

## 组件外侦听

`vmWatch()` 可在组件之外使用，并返回解除监听的函数。使用方应在合适的生命周期调用它。

```ts
const stop = vmWatch(state, 'count', (value) => console.log(value));
// 不再需要时
stop();
```

## 请求竞态

请求依赖可变状态时，需要应用处理过期响应，例如使用 AbortController 或请求序号。更多监听与路径通知行为见[数据侦听示例](/examples/watch/)。
