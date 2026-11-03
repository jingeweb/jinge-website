import type { JNode, WithSlots } from 'jinge';

/**
 * 演示命名插槽与插槽兜底。
 *
 * 插槽在编译后就是 props 上的函数：
 * - `props.children` 等价于 `props['slot:default']`
 * - 其他插槽是 `props['slot:名称']`
 */
export function Card(
  props: {
    title: string;
  } & WithSlots<{
    default?: JNode;
    footer?: JNode;
  }>,
) {
  return (
    <section className="card">
      <header className="card-header">{props.title}</header>
      <div className="card-body">
        {props.children ?? <p className="hint">{'没有传入默认插槽时显示这段兜底内容。'}</p>}
      </div>
      <footer className="card-footer">
        {props['slot:footer'] ?? <span className="hint">{'默认页脚'}</span>}
      </footer>
    </section>
  );
}
