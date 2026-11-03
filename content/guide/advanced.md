---
title: 动态组件与动画
description: 按需加载、切换组件与过渡效果。
group: 进阶
---

## 动态组件

```tsx
import { Dynamic, vm, type FC } from 'jinge';

const state = vm<{ current: FC }>({ current: Overview });
<Dynamic fc={state.current} />;
```

`Dynamic` 在组件类型变化时销毁旧实例、创建新实例。想保留数据，应把状态提升到外层；框架没有内置 KeepAlive。

## 异步组件

```tsx
import { lazy } from 'jinge';

const Settings = lazy(() => import('./Settings').then((module) => module.Settings), {
  'slot:loading': <p>正在加载…</p>,
  'slot:error': (props) => <p>{props.error.message}</p>,
});
```

加载函数应返回组件函数。查看[动态组件示例](/examples/dynamic-components/)体验加载状态和实例重建。

## 过渡与列表动画

`Transition` 配合 CSS 管理进入和离开效果；`TransitionGroup` 用于列表场景。使用真实的业务时长，并尊重用户的减少动态效果设置。完整样式与组件参数见[过渡动画示例](/examples/transition/)。

## Portal

Portal 可将内容渲染到指定 DOM 容器，适合弹层等场景。焦点管理、键盘关闭和滚动锁定仍由组件负责，详见[内置组件 API](/api/components/)。
