import { vm } from 'jinge';

import { Counter } from './components/counter';
import { TextField } from './components/text-field';

const handlers = {
  A: () => pushLog('handler A 被调用'),
  B: () => pushLog('handler B 被调用'),
};

function pushLog(message: string) {
  state.log.unshift(message);
  if (state.log.length > 6) state.log.pop();
}

const state = vm({
  counter: 0,
  step: 2,
  name: 'jinge',
  uncontrolled: '',
  log: [] as string[],
  handler: handlers.A as () => void,
  lastKey: '',
});

export function App() {
  return (
    <>
      <h1>事件 Events</h1>
      <p className="hint">
        {
          'jinge 没有合成事件：DOM 事件通过 on: 前缀直接映射到 addEventListener，组件事件就是普通的 on:xxx 回调属性。'
        }
      </p>

      <h2>1. 组件自定义事件</h2>
      <Counter
        step={state.step}
        on:change={(value) => {
          state.counter = value;
          pushLog(`change 事件：${value}`);
        }}
      />
      <p className="hint">
        {'子组件通过 props["on:change"]?.(value) 通知父组件；父组件把 step 传成动态值：'}
        <input
          className="range"
          type="range"
          min="1"
          max="10"
          value={state.step}
          on:input={(evt) => (state.step = Number(evt.target.value))}
        />
        <code>{`step=${state.step}`}</code>
        {'，当前计数 '}
        <code>{state.counter}</code>
      </p>

      <h2>2. 受控与非受控组件</h2>
      <label className="row">
        <span className="label">{'受控'}</span>
        <TextField value={state.name} on:change={(value) => (state.name = value)} />
        <code>{state.name || '（空）'}</code>
      </label>
      <label className="row">
        <span className="label">{'非受控'}</span>
        <TextField
          placeholder={'内部维护状态'}
          on:change={(value) => (state.uncontrolled = value)}
        />
        <code>{state.uncontrolled || '（空）'}</code>
      </label>

      <h2>3. 动态 handler</h2>
      <button className="btn" on:click={state.handler}>
        {'当前 handler：'}
        {state.handler === handlers.A ? 'A' : 'B'}
      </button>
      <button
        className="btn"
        on:click={() => (state.handler = state.handler === handlers.A ? handlers.B : handlers.A)}
      >
        {'切换 handler'}
      </button>
      <p className="hint">
        {
          'on:click={state.handler} 会被编译成 watchPathForDOMEventBind：值变化时先解绑旧函数，再绑定新函数。'
        }
      </p>

      <h2>4. 捕获、双击、键盘</h2>
      <div
        className="capture"
        on:clickCapture={() => pushLog('capture：外层捕获')}
        on:click={() => pushLog('bubble：外层冒泡')}
      >
        <button className="btn" on:click={() => pushLog('target：内层按钮')}>
          {'点我'}
        </button>
      </div>
      <p className="hint">
        {'on:clickCapture 等价于 addEventListener(..., true)；on:doubleClick 会被编译成 dblclick。'}
      </p>
      <button className="btn" on:doubleClick={() => pushLog('dblclick：双击')}>
        {'双击我'}
      </button>
      <input
        className="input"
        placeholder={'在这里按键'}
        on:keyDown={(evt) => (state.lastKey = `${evt.key}`)}
      />
      <code>{state.lastKey || '（还没有按键）'}</code>

      <h2>5. 事件委托与表单提交</h2>
      <ul
        className="delegate"
        on:click={(evt) => {
          const el = (evt.target as HTMLElement).closest('li');
          if (el) pushLog(`delegate：${el.dataset.id}`);
        }}
      >
        <li data-id="a">{'条目 A'}</li>
        <li data-id="b">{'条目 B'}</li>
        <li data-id="c">{'条目 C'}</li>
      </ul>
      <form
        className="form"
        on:submit={(evt) => {
          evt.preventDefault();
          pushLog('submit：已阻止默认提交');
        }}
      >
        <input
          className="input"
          value={state.name}
          on:input={(evt) => (state.name = evt.target.value)}
        />
        <button className="btn" type="submit">
          {'提交表单'}
        </button>
      </form>

      <h2>事件日志</h2>
      <ul className="log">
        {state.log.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
      {state.log.length === 0 && <p className="hint">{'点击上面的示例，日志会出现在这里。'}</p>}
    </>
  );
}
