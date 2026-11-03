import { type WithEvents, isUndefined, vm, watch } from 'jinge';

/**
 * 同时支持受控与非受控用法的输入框：
 * - 传入 value 即受控，输入时只通知父组件，不修改内部状态；
 * - 不传 value 即非受控，内部维护状态。
 */
export function TextField(
  props: {
    value?: string;
    placeholder?: string;
  } & WithEvents<{
    change?: (value: string) => void;
  }>,
) {
  const controlled = !isUndefined(props.value);
  const state = vm({ value: props.value ?? '' });

  watch(props, 'value', (v) => {
    state.value = v ?? '';
  });

  return (
    <input
      className="input"
      placeholder={props.placeholder ?? ''}
      value={state.value}
      on:input={(evt) => {
        if (!controlled) state.value = evt.target.value;
        props['on:change']?.(evt.target.value);
      }}
    />
  );
}
