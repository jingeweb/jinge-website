---
title: 插槽
description: 通过有类型的内容插槽组合组件。
group: 组件
---

## 默认插槽

```tsx
import { type JNode, type WithSlots } from 'jinge';

function Card(
  props: { title: string } & WithSlots<{
    default?: JNode;
    footer?: JNode;
  }>,
) {
  return (
    <section>
      <h2>{props.title}</h2>
      <div>{props.children}</div>
      <footer>{props['slot:footer']}</footer>
    </section>
  );
}
```

`props.children` 对应默认插槽；命名插槽通过 `slot:名称` 提供。

## 传入具名内容

```tsx
<Card title="发布记录" slot:footer={<a href="/releases">查看全部</a>}>
  <p>你的应用已准备就绪。</p>
</Card>
```

具名插槽写在组件属性上。

## 作用域插槽

插槽可以接收由子组件提供的数据。使用函数插槽和 `WithSlots` 声明数据类型，父组件在模板中消费这些数据。完整的定义、调用和透传方式可在[插槽示例](/examples/slots/)中查看。

## 可选内容

默认内容可写作 `props.children ?? <p>暂无内容</p>`。把布局结构保留在容器组件中，把内容交给调用方，是组合通用组件的常见方式。
