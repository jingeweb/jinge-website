import { type FC, Dynamic, cx, lazy, vm } from 'jinge';

import { CounterPanel } from './components/counter-panel';
import { ProfilePanel } from './components/profile-panel';

const LazyPanel = lazy(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mod = await import('./components/lazy-panel');
    return mod.LazyPanel;
  },
  {
    'slot:loading': <p className="desc">{'组件加载中（800ms）...'}</p>,
    'slot:error': (props) => <p className="error">{`加载失败：${props.error.message}`}</p>,
  },
);

type TabKey = 'counter' | 'profile' | 'lazy';

interface Tab {
  key: TabKey;
  label: string;
  fc: FC;
}

const tabs: Tab[] = [
  { key: 'counter', label: '计数器', fc: CounterPanel },
  { key: 'profile', label: '个人信息', fc: ProfilePanel },
  { key: 'lazy', label: '异步面板', fc: LazyPanel },
];

export function App() {
  const state = vm<{ tab: TabKey; current: FC; title: string }>({
    tab: 'counter',
    current: tabs[0].fc,
    title: tabs[0].label,
  });

  function select(tab: Tab) {
    state.tab = tab.key;
    state.current = tab.fc;
    state.title = tab.label;
  }

  return (
    <>
      <h1>动态组件</h1>
      <p className="hint">
        {
          '<Dynamic fc={...} /> 会在 fc 变化时销毁旧组件、渲染新组件；它和 If 的区别是切换的是“组件类型”而不是条件。'
        }
      </p>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={cx('tab', state.tab === tab.key && 'active')}
            on:click={() => select(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="panel">
        <Dynamic fc={state.current} title={state.title} />
      </div>

      <p className="hint">
        {
          '异步面板演示 lazy()：首次进入时先渲染 slot:loading，加载完成后替换为真实组件；loader 抛错时渲染 slot:error。'
        }
      </p>
      <p className="hint">
        {
          '注意：Dynamic 切换会销毁旧实例，组件内部状态不会保留；如果需要缓存，需要自己把状态提升到外层或使用 KeepAlive 一类的方案（jinge 暂未内置）。'
        }
      </p>
    </>
  );
}
