---
title: Ref 与生命周期
description: 在正确的时间接入 DOM 与外部资源。
group: 组件
---

## 挂载与销毁

```tsx
import { onMount, onUnmount, ref } from 'jinge';

function CanvasPanel() {
  const canvas = ref<HTMLCanvasElement>();
  onMount(() => {
    const ctx = canvas.value?.getContext('2d');
    ctx?.fillRect(0, 0, 40, 40);
  });
  onUnmount(() => {
    // 释放组件拥有的外部资源
  });
  return <canvas ref={canvas} width={200} height={100} />;
}
```

在组件初始化期间注册生命周期函数。需要读取已经插入页面的 DOM 时使用 `onMount()`。

## 清理副作用

`onMount()` 可以返回清理函数。事件监听器、定时器、图表实例和订阅，都应在组件销毁时释放。

```ts
onMount(() => {
  const timer = window.setInterval(refresh, 1000);
  return () => window.clearInterval(timer);
});
```

## 组件引用

DOM Ref 用于持有节点；子组件可通过 `expose()` 暴露明确的方法集合。避免让父组件依赖子组件的内部 DOM 结构。

## 第三方库

[集成 ECharts](/examples/integrated-with-echarts/)展示了挂载图表与释放实例的具体写法；[Ref 与生命周期](/examples/ref-and-life-cycle/)示例展示 DOM 引用和组件引用。
