import { context, cx, onMount, vm } from 'jinge';

interface Theme {
  dark: boolean;
  primary: string;
}

interface FormConfig {
  disabled: boolean;
  labelWidth: number;
}

const THEME_KEY = 'demo.theme';
const FORM_KEY = 'demo.form';

function ThemeBadge() {
  const theme = context<Theme>(THEME_KEY);
  return (
    <span className={cx('badge', theme.dark && 'dark')} style={`border-color:${theme.primary}`}>
      {theme.dark ? '深色' : '浅色'}
    </span>
  );
}

function DeepChild() {
  const theme = context<Theme>(THEME_KEY);
  const cfg = context<FormConfig>(FORM_KEY);
  return (
    <div className="deep">
      <p className="muted">{'这是第三层组件，没有经过任何 props 传递：'}</p>
      <ul>
        <li>
          {'主题：'}
          {theme.dark ? 'dark' : 'light'}
        </li>
        <li>
          {'主色：'}
          <code>{theme.primary}</code>
        </li>
        <li>
          {'表单禁用：'}
          {cfg.disabled ? '是' : '否'}
        </li>
      </ul>
    </div>
  );
}

function FormPreview() {
  const cfg = context<FormConfig>(FORM_KEY);
  return (
    <div className="preview">
      <label className="row">
        <span className="label" style={`width:${cfg.labelWidth}px`}>
          {'昵称'}
        </span>
        <input className="input" disabled={cfg.disabled} value="jinge" />
      </label>
      <label className="row">
        <span className="label" style={`width:${cfg.labelWidth}px`}>
          {'邮箱'}
        </span>
        <input className="input" disabled={cfg.disabled} value="hi@jinge.dev" />
      </label>
    </div>
  );
}

function Layout() {
  const theme = context<Theme>(THEME_KEY);
  return (
    <div className={cx('layout', theme.dark && 'dark')}>
      <aside className="side">
        <ThemeBadge />
      </aside>
      <main className="main">
        <FormPreview />
        <DeepChild />
      </main>
    </div>
  );
}

export function App() {
  const theme = vm<Theme>({ dark: false, primary: '#2f6feb' });
  const form = vm<FormConfig>({ disabled: false, labelWidth: 72 });
  const state = vm({ error: '' });

  // 在渲染期间写入 context；子组件在创建时继承这份 context。
  context(THEME_KEY, theme);
  context(FORM_KEY, form);

  onMount(() => {
    // 渲染结束后 componentHost 已被还原，此时再调用 context 会报错。
    try {
      context(THEME_KEY, theme);
    } catch (err) {
      state.error = (err as Error).message;
    }
  });

  return (
    <>
      <h1>上下文 Context</h1>
      <p className="hint">
        {
          'context 在渲染期间向下传递，组件可以跨任意层级读取，不必逐层透传 props。context 的值本身是 vm，所以深层组件里的读取依然是响应式的。'
        }
      </p>

      <div className="toolbar">
        <button className="btn" on:click={() => (theme.dark = !theme.dark)}>
          {'切换明暗'}
        </button>
        <button
          className="btn"
          on:click={() => (theme.primary = theme.primary === '#2f6feb' ? '#d1242f' : '#2f6feb')}
        >
          {'切换主色'}
        </button>
        <button className="btn" on:click={() => (form.disabled = !form.disabled)}>
          {'切换禁用'}
        </button>
        <button
          className="btn"
          on:click={() => (form.labelWidth = form.labelWidth === 72 ? 120 : 72)}
        >
          {'切换标签宽度'}
        </button>
      </div>

      <Layout />

      <h2>写入时机的约束</h2>
      <p className="hint">
        {
          'context 只能在组件渲染期间写入。渲染结束后 host 会被还原，在 onMount / 事件回调里再写就会抛错：'
        }
      </p>
      <pre className="error">{state.error}</pre>
    </>
  );
}
