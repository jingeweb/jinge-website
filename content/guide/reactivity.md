---
title: 响应式数据
description: 用 vm 描述状态，让数据变化抵达界面。
group: 基础
---

## 创建状态

`vm()` 将对象或数组包装为响应式 ViewModel。模板直接读取它的属性，事件处理函数直接修改属性。

```tsx
import { vm } from 'jinge';

export function Counter() {
  const state = vm({ count: 0, user: { name: 'Jinge' } });
  return (
    <section>
      <p>
        {state.user.name}: {state.count}
      </p>
      <button on:click={() => state.count++}>增加</button>
    </section>
  );
}
```

## 保留属性访问

```ts
const state = vm({ count: 0 });
const count = state.count; // 普通数字快照，不是响应式引用
state.count++;
```

在模板中使用 `state.count`，而不是期待解构出来的数字自动更新。组件函数是初始化逻辑；它不会因为每次状态变化重新执行。

## 数组变更

对 VM 数组使用 `push()`、`splice()` 等操作，列表会收到变更通知。查看[列表示例](/examples/list-rendering/)理解插入、删除与重排。

## 模板之外的副作用

模板里的属性访问由编译器处理；数据请求、日志等副作用使用[watch](/guide/watch/)。不要把组件初始化时计算出的普通变量当成自动重新计算的状态。

## 原始数据与边界

`vmRaw()` 可取出原始数据；直接修改原始对象不会经过 Proxy 通知。`vmIgnore()` 用于标记不需要转换为 VM 的对象。对于复杂数据结构，先用小型示例验证通知行为。

循环引用受到保护，不会无限传播；但通知不保证能沿同一环反复绕行。监听环内对象时，直接监听目标对象上的属性。
