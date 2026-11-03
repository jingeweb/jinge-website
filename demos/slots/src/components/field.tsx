import type { JNode, WithChildren } from 'jinge';

export interface FieldContext {
  id: string;
  placeholder: string;
}

/**
 * 演示作用域插槽：组件把内部数据作为参数传给插槽函数。
 */
export function Field(
  props: {
    label: string;
  } & WithChildren<(ctx: FieldContext) => JNode>,
) {
  return (
    <label className="field">
      <span className="field-label">{props.label}</span>
      {props.children({
        id: 'field-scoped',
        placeholder: '由 Field 组件传入的 placeholder',
      })}
    </label>
  );
}
