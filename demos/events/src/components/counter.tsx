import { type WithEvents, vm } from 'jinge';

export function Counter(
  props: {
    step?: number;
  } & WithEvents<{
    change?: (value: number) => void;
  }>,
) {
  const state = vm({ n: 0 });

  function update(delta: number) {
    // 事件回调里读取 props 拿到的是当前值；step 变化后下一次点击即生效。
    state.n += delta * (props.step ?? 1);
    props['on:change']?.(state.n);
  }

  return (
    <div className="counter">
      <button className="btn" on:click={() => update(-1)}>
        -
      </button>
      <strong className="counter-value">{state.n}</strong>
      <button className="btn" on:click={() => update(1)}>
        +
      </button>
    </div>
  );
}
