import {
  type JNode,
  cx,
  intlGetLocale,
  intlSetLocale,
  intlWatchLocale,
  onUnmount,
  t,
  vm,
} from 'jinge';

export function App() {
  const state = vm({
    name: 'jinge',
    count: 3,
    clicked: false,
    locale: intlGetLocale(),
    error: '',
  });

  // intlWatchLocale 会在语言切换后触发，用来同步非模板里的状态。
  onUnmount(
    intlWatchLocale((locale) => {
      state.locale = locale;
    }),
  );

  async function switchLocale(locale: string) {
    if (locale === state.locale) return;
    try {
      await intlSetLocale(locale);
      state.locale = intlGetLocale();
      document.documentElement.lang = locale;
    } catch (err) {
      state.error = (err as Error).message;
    }
  }

  return (
    <>
      <h1>{t('国际化示例')}</h1>
      <p className="hint">
        {t('下面这些文本都会在编译时被替换成 6 位 key，并在运行时从字典中读取。')}
      </p>

      <div className="toolbar">
        <span>{t('当前语言：')}</span>
        <code>{state.locale === 'zh' ? '简体中文' : 'English'}</code>
        <button
          className={cx('btn', state.locale === 'zh' && 'active')}
          on:click={() => void switchLocale('zh')}
        >
          {'中文'}
        </button>
        <button
          className={cx('btn', state.locale === 'en' && 'active')}
          on:click={() => void switchLocale('en')}
        >
          {'English'}
        </button>
      </div>
      {state.error && <p className="error">{state.error}</p>}

      <h2>{t('1. 简单文本')}</h2>
      <p>{t('这是一段普通的静态文本。')}</p>

      <h2>{t('2. 带参数的文本')}</h2>
      <p>{t('你好，{name}！', { name: state.name })}</p>
      <p>{t('当前计数：{count}', { count: state.count })}</p>
      <p>{t('带显式 key 的文本：{value}', { value: state.count }, { key: 'demo.explicit' })}</p>
      <div className="row">
        <input
          className="input"
          value={state.name}
          on:input={(evt) => (state.name = evt.target.value)}
        />
        <button className="btn" on:click={() => (state.count += 1)}>
          {t('增加计数')}
        </button>
      </div>

      <h2>{t('3. 属性上的文本')}</h2>
      <input className="input" placeholder={t('请输入你的名字')} />
      <p className="hint">{t('属性上的 t() 会被编译成 IntlWatcher，语言切换时属性值也会更新。')}</p>

      <h2>{t('4. 富文本')}</h2>
      <p>
        {t('点击<a>{action}</a>查看详情。', {
          action: t('这里'),
          a: (children: JNode) => (
            <a className="link" href="#details">
              {children}
            </a>
          ),
        })}
      </p>
      <p className="hint">
        {t('富文本的翻译里可以保留标签，编译时会从调用处的 JSX 中取出对应标签的渲染函数。')}
      </p>

      <h2>{t('5. 事件与状态')}</h2>
      <button className="btn" on:click={() => (state.clicked = !state.clicked)}>
        {state.clicked ? t('按钮已点击') : t('点击我')}
      </button>
      <p className="hint">{t('语言切换会立即更新模板中的文本，但不会重新执行组件函数。')}</p>
    </>
  );
}
