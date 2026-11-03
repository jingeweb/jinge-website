import { cx, vm } from 'jinge';

function toneColor(tone: string) {
  if (tone === 'green') return '#1a7f37';
  if (tone === 'purple') return '#8250df';
  return '#2f6feb';
}

export function App() {
  const state = vm({
    dark: false,
    rounded: true,
    tone: 'blue',
    progress: 35,
    active: true,
  });

  return (
    <>
      <h1>样式 Styling</h1>
      <p className="hint">
        {
          'jinge 直接使用 className（会被编译成 class 属性）与 style 字符串，没有内置的 scoped CSS，也没有对象形式的 style。'
        }
      </p>

      <div className="toolbar">
        <button className="btn" on:click={() => (state.dark = !state.dark)}>
          {'切换明暗'}
        </button>
        <button className="btn" on:click={() => (state.rounded = !state.rounded)}>
          {'切换圆角'}
        </button>
        <button className="btn" on:click={() => (state.active = !state.active)}>
          {'切换激活态'}
        </button>
        <button
          className="btn"
          on:click={() =>
            (state.tone =
              state.tone === 'blue' ? 'green' : state.tone === 'green' ? 'purple' : 'blue')
          }
        >
          {'切换主色'}
        </button>
      </div>

      <div
        className={cx('theme', state.dark && 'dark', state.rounded && 'rounded')}
        style={`--tone:${toneColor(state.tone)}`}
      >
        <div className="theme-head">
          <svg width="56" height="56" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill={state.dark ? '#e6edf3' : '#1f2328'} />
            <rect x="20" y="20" width="24" height="24" rx="6" fill={toneColor(state.tone)} />
          </svg>
          <div>
            <p className="title">{'CSS 变量驱动的主题'}</p>
            <p className="desc">
              {'主色来自内联的 --tone 变量，背景与文字来自 .theme / .theme.dark 上的变量。'}
            </p>
          </div>
        </div>

        <div className="row">
          <span className={cx('dot', state.active && 'on')} />
          <span>{state.active ? '激活状态：on' : '激活状态：off'}</span>
        </div>

        <div className="row">
          <span className="progress-label">{'进度'}</span>
          <div className="bar">
            <div className="bar-inner" style={`width:${state.progress}%`}></div>
          </div>
          <code>{`${state.progress}%`}</code>
        </div>
        <input
          className="range"
          type="range"
          min="0"
          max="100"
          value={state.progress}
          on:input={(evt) => (state.progress = Number(evt.target.value))}
        />

        <p className="desc">
          {'className 用 cx 组合：cx("theme", dark && "dark", rounded && "rounded")。'}
        </p>
      </div>
    </>
  );
}
