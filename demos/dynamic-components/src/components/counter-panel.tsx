import { vm } from 'jinge';

let instanceId = 0;

export function CounterPanel(props: { title?: string }) {
  const id = ++instanceId;
  const state = vm({ n: 0 });

  return (
    <div>
      <h3>{props.title}</h3>
      <p className="desc">
        {'这是组件内部状态。切换到别的 tab 再切回来，实例会被销毁重建，计数会归零。'}
      </p>
      <p className="desc">{`当前实例：#${id}`}</p>
      <div className="counter">
        <button className="btn" on:click={() => (state.n -= 1)}>
          -
        </button>
        <strong className="count">{state.n}</strong>
        <button className="btn" on:click={() => (state.n += 1)}>
          +
        </button>
      </div>
    </div>
  );
}
