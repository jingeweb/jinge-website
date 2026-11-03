import type { JNode, WithChildren } from 'jinge';

import { Card } from './card';

/**
 * 演示插槽透传：把自身的默认插槽原样转交给 Card 的 footer 插槽。
 *
 * 编译后 `props.children` 会变成 `props['slot:default']`，
 * 因此这里本质上是把“默认插槽函数”这个值传了下去。
 */
export function Panel(props: { title: string } & WithChildren<JNode>) {
  return (
    <Card title={props.title} slot:footer={props.children}>
      <p className="hint">{'这是 Panel 自己的默认插槽内容，会进入 Card 的 body。'}</p>
    </Card>
  );
}
