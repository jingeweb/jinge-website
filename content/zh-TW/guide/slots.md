---
title: 插槽
description: 通過有型別的內容插槽組合元件。
group: 元件
---

## 預設插槽

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

`props.children` 對應預設插槽；命名插槽通過 `slot:名稱` 提供。

## 傳入具名內容

```tsx
<Card title="釋出記錄" slot:footer={<a href="/releases">檢視全部</a>}>
  <p>你的應用已準備就緒。</p>
</Card>
```

具名插槽寫在元件屬性上。

## 作用域插槽

插槽可以接收由子元件提供的資料。使用函式插槽和 `WithSlots` 宣告資料型別，父元件在模板中消費這些資料。完整的定義、呼叫和透傳方式可在[插槽示例](/examples/slots/)中檢視。

## 可選內容

預設內容可寫作 `props.children ?? <p>暫無內容</p>`。把佈局結構保留在容器元件中，把內容交給呼叫方，是組合通用元件的常見方式。
