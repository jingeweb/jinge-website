import { t, vm } from 'jinge';

import { Html } from '../components/html';
import { setMeta } from '../data';
import homeCode from '../generated/home-code.json';
import { href } from '../i18n';
import { copyText } from '../state';

export function Home() {
  setMeta(
    t('用标准 TSX，构建轻巧的响应式应用'),
    t('标准 TSX、Proxy 响应式、Rust 编译器。Jinge 让熟悉的 TypeScript 直接连接界面更新。'),
  );
  const state = vm({ count: 0 });
  return (
    <main id="main-content" className="home">
      <section className="hero page-width mx-auto grid w-[min(1240px,_calc(100%_-_96px))] grid-cols-[1.07fr_1fr] items-center gap-15 pt-17.25 pb-16.25 max-[1150px]:w-[calc(100%_-_64px)] max-[1150px]:gap-8.75 max-[950px]:gap-6.75 max-[950px]:pt-11.25 max-[700px]:w-[calc(100%_-_40px)] max-[700px]:grid-cols-1 max-[700px]:gap-8 max-[700px]:pt-8.75 max-[700px]:pb-8.75 max-[370px]:w-[calc(100%_-_30px)] min-[1450px]:gap-21.25 min-[1450px]:pt-21.25 min-[1450px]:pb-21.25 max-[700px]:[&_.button]:min-h-11 max-[700px]:[&_.button]:gap-7 max-[700px]:[&_.button]:px-5 max-[700px]:[&_.button]:py-2.25 max-[700px]:[&_.button]:text-[12px] [&_.eyebrow]:mb-4.5 max-[700px]:[&_.eyebrow]:mb-3.75 max-[700px]:[&_.eyebrow]:text-[9px] [&_h1]:mb-5.25 [&_h1]:text-[clamp(34px,_3.5vw,_52px)] [&_h1]:leading-[1.42] [&_h1]:font-bold [&_h1]:tracking-[-1.9px] [&_h1]:whitespace-nowrap max-[1150px]:[&_h1]:text-[39px] max-[1150px]:[&_h1]:tracking-[-1.6px] max-[950px]:[&_h1]:text-[33px] max-[700px]:[&_h1]:mb-4.5 max-[700px]:[&_h1]:text-[clamp(31px,_7.8vw,_48px)] max-[700px]:[&_h1]:leading-[1.45] max-[700px]:[&_h1]:whitespace-normal max-[370px]:[&_h1]:text-[30px] min-[1450px]:[&_h1]:text-[53px] [[lang=en]_&]:[&_h1]:text-[clamp(28px,2.8vw,42px)] [[lang=en]_&]:[&_h1]:whitespace-normal">
        <div className="hero-copy">
          <a
            className="release-pill mb-7.75 inline-flex items-center gap-2.25 rounded-[20px] border border-solid border-line pt-1 pr-2.25 pb-1 pl-1.75 text-[10px] text-muted hover:bg-subtle max-[950px]:text-[9px] max-[700px]:mb-6.25"
            href={href('https://github.com/jingeweb/jinge/releases')}
            target="_blank"
            rel="noreferrer"
          >
            <span className="status-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#81a547]" />
            Jinge 4.2
            <span className="pill-line h-2.5 w-0.25 bg-line" />
            {t('用更少，表达更多')}
            <span>↗</span>
          </a>
          <p className="eyebrow font-mono text-[10px] leading-[1.5] font-semibold tracking-[0.16em] text-muted">
            {t('一个小巧的前端界面框架')}
          </p>
          <h1>
            {t('标准 TSX。')}
            <br />
            <span className="hero-accent relative z-0 after:absolute after:inset-[53%_-5px_2px_-3px] after:-z-1 after:[transform:rotate(-2deg)] after:rounded-[2px] after:bg-accent after:opacity-90 after:content-[''] dark:text-ink dark:after:bg-[#6d8c38] dark:after:opacity-[0.55]">
              {t('轻巧')}
            </span>
            {t('的响应式应用')}
            <span className="end-dot text-[#91ac55]">.</span>
          </h1>
          <p className="hero-description mb-6.5 text-[13px] leading-[1.95] text-muted max-[1150px]:text-[12px] max-[950px]:text-[11px] max-[700px]:mb-5.5 max-[700px]:text-[12px]">
            {t('让熟悉的 TypeScript，直接连接界面更新。')}
            <br />
            {t('Proxy 驱动数据，Rust 编译模板，无需虚拟 DOM。')}
          </p>
          <div className="hero-buttons flex gap-2.75 max-[370px]:gap-2.25">
            <a
              className="button primary inline-flex min-h-11.75 items-center justify-center gap-8 rounded-[7px] px-5.5 py-2.75 text-[13px] font-semibold whitespace-nowrap [&.primary]:border [&.primary]:border-solid [&.primary]:border-[#c7e95f] [&.primary]:bg-accent [&.primary]:text-[#293d20] [&.primary:hover]:[transform:translateY(-2px)] [&.primary:hover]:bg-[#c4ed50] [&.secondary]:border [&.secondary]:border-solid [&.secondary]:border-line [&.secondary]:bg-surface [&.secondary]:text-ink [&.secondary:hover]:bg-subtle"
              href={href('/guide/quick-start/')}
            >
              {t('开始使用')}
              <span>↗</span>
            </a>
            <a
              className="button secondary inline-flex min-h-11.75 items-center justify-center gap-8 rounded-[7px] px-5.5 py-2.75 text-[13px] font-semibold whitespace-nowrap [&.primary]:border [&.primary]:border-solid [&.primary]:border-[#c7e95f] [&.primary]:bg-accent [&.primary]:text-[#293d20] [&.primary:hover]:[transform:translateY(-2px)] [&.primary:hover]:bg-[#c4ed50] [&.secondary]:border [&.secondary]:border-solid [&.secondary]:border-line [&.secondary]:bg-surface [&.secondary]:text-ink [&.secondary:hover]:bg-subtle"
              href={href('/examples/')}
            >
              {t('探索示例')}
              <span>→</span>
            </a>
          </div>
          <button
            className="install-command mt-5.25 flex items-center gap-3.25 bg-transparent p-0 text-[11px] text-muted [&_code]:tracking-[0.01em] [&_code]:text-ink"
            on:click={() => void copyText('pnpm add jinge')}
            aria-label={t('复制安装命令 pnpm add jinge')}
          >
            <span className="command-prefix text-[#94a180]">$</span>
            <code>pnpm add jinge</code>
            <span className="copy-symbol ml-1.5 text-[16px] text-[#8a9683]">⧉</span>
          </button>
        </div>
        <div className="hero-code relative pt-2.5 max-[700px]:w-full max-[700px]:max-w-132.5 max-[700px]:justify-self-center">
          <div className="code-window relative z-1 overflow-hidden rounded-[11px] border border-solid border-line bg-surface shadow-site">
            <div className="window-top flex h-11 items-center justify-between border-b border-solid border-b-line px-4.25 py-0 font-mono text-[10px] leading-[normal] font-normal text-muted">
              <div className="window-dots flex gap-1.25 [&_i]:h-1.75 [&_i]:w-1.75 [&_i]:rounded-full [&_i]:bg-line [&_i:first-child]:bg-[#e5a68e] [&_i:nth-child(2)]:bg-[#e6cf86] [&_i:nth-child(3)]:bg-[#a5c18a]">
                <i />
                <i />
                <i />
              </div>
              <span>Counter.tsx</span>
              <span className="file-type text-[9px] text-[#91a087]">TSX</span>
            </div>
            <Html
              html={homeCode.html}
              className="hero-source px-5.75 pt-5 pb-4 max-[1150px]:p-4.5 max-[950px]:p-4 max-[700px]:px-5.5 max-[700px]:py-4.5 min-[1450px]:py-5.75 [&_pre]:m-0 [&_pre]:overflow-auto [&_pre]:text-[11px] [&_pre]:leading-[1.88] max-[1150px]:[&_pre]:text-[10px] max-[950px]:[&_pre]:text-[9px] max-[700px]:[&_pre]:text-[11px] max-[370px]:[&_pre]:text-[10px] min-[1450px]:[&_pre]:text-[12px]"
            />
            <div className="live-preview border-t border-solid border-t-line bg-subtle px-5.25 pt-3.25 pb-4.5">
              <div className="preview-caption mb-3.25 flex justify-between text-[9px] text-muted [&_>_span:first-child]:flex [&_>_span:first-child]:items-center [&_>_span:first-child]:gap-1.5 [&_>_span:first-child]:font-mono [&_>_span:first-child]:text-[9px] [&_>_span:first-child]:tracking-[0.08em]">
                <span>
                  <span className="status-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#81a547]" />
                  {t('可交互预览')}
                </span>
                <span>{t('试着点一下 ↴')}</span>
              </div>
              <div className="counter-row flex items-center gap-2.5">
                <button
                  className="counter-button flex items-center gap-1.25 rounded-[5px] border border-solid border-[#bcd966] bg-accent px-3 py-2.25 font-mono text-[11px] leading-[normal] font-normal text-[#2c4123] active:[transform:scale(0.97)] [&_span]:ml-2.25 [&_span]:border-l [&_span]:border-solid [&_span]:border-l-[#b2d15b] [&_span]:pl-2.5"
                  on:click={() => state.count++}
                >
                  Count: <strong>{state.count}</strong>
                  <span>+</span>
                </button>
                <button
                  className="reset-button bg-transparent p-0.75 text-[17px] text-muted"
                  aria-label={t('重置计数器')}
                  on:click={() => {
                    state.count = 0;
                  }}
                >
                  ↺
                </button>
                <span className="reactive-note ml-auto text-[10px] text-muted max-[1150px]:text-[9px] max-[950px]:hidden max-[700px]:block max-[700px]:text-[9px] max-[370px]:hidden">
                  {t('修改状态，界面随之更新。')}
                </span>
              </div>
            </div>
          </div>
          <div className="code-footnote mt-4.75 flex justify-center gap-2 text-[10px] text-muted max-[700px]:mt-3.5 max-[700px]:text-[9px]">
            <span className="bracket-mark font-mono text-[#8eaa56]">{'{ }'}</span>
            {t('熟悉的语法，更直接的更新。')}
          </div>
          <span className="hero-orbit orbit-one absolute z-0 h-5.75 w-5.75 [transform:rotate(17deg)] rounded-md border border-solid border-[#a8b885] opacity-45 max-[700px]:hidden [&.orbit-one]:top-[-8px] [&.orbit-one]:right-[-21px] [&.orbit-two]:bottom-12.25 [&.orbit-two]:left-[-21px] [&.orbit-two]:h-3.25 [&.orbit-two]:w-3.25 [&.orbit-two]:[transform:rotate(-15deg)]" />
          <span className="hero-orbit orbit-two absolute z-0 h-5.75 w-5.75 [transform:rotate(17deg)] rounded-md border border-solid border-[#a8b885] opacity-45 max-[700px]:hidden [&.orbit-one]:top-[-8px] [&.orbit-one]:right-[-21px] [&.orbit-two]:bottom-12.25 [&.orbit-two]:left-[-21px] [&.orbit-two]:h-3.25 [&.orbit-two]:w-3.25 [&.orbit-two]:[transform:rotate(-15deg)]" />
        </div>
      </section>
      <div className="principles-strip border-t border-b border-solid border-t-line border-b-line [&_>_div]:flex [&_>_div]:min-h-17.25 [&_>_div]:items-center [&_>_div]:justify-between [&_>_div]:gap-4 [&_>_div]:text-[10px] [&_>_div]:text-muted max-[700px]:[&_>_div]:flex-wrap max-[700px]:[&_>_div]:justify-center max-[700px]:[&_>_div]:gap-[12px_20px] max-[700px]:[&_>_div]:px-0 max-[700px]:[&_>_div]:py-4.25 max-[700px]:[&_>_div_>_span]:text-[8px] [&_>_div_>_span:first-child]:text-[10px] max-[700px]:[&_>_div_>_span:first-child]:w-full max-[700px]:[&_>_div_>_span:first-child]:text-center max-[700px]:[&_>_div_>_span:first-child]:text-[9px] [&_b]:mr-2 [&_b]:font-mono [&_b]:text-[12px] [&_b]:font-semibold [&_b]:text-ink max-[700px]:[&_b]:mr-1 max-[700px]:[&_b]:text-[10px]">
        <div className="page-width mx-auto w-[min(1240px,_calc(100%_-_96px))] max-[1150px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_40px)] max-[370px]:w-[calc(100%_-_30px)]">
          <span>{t('为浏览器界面而生')}</span>
          <span>
            <b>TSX</b> {t('标准语法')}
          </span>
          <span>
            <b>Proxy</b> {t('响应式数据')}
          </span>
          <span>
            <b>Rust</b> {t('编译器')}
          </span>
          <span>
            <b>DOM</b> {t('直接更新')}
          </span>
        </div>
      </div>
      <section className="features-section page-width mx-auto w-[min(1240px,_calc(100%_-_96px))] pt-19.5 pb-17.75 max-[1150px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_40px)] max-[700px]:py-11.5 max-[370px]:w-[calc(100%_-_30px)]">
        <div className="section-heading [&_.eyebrow]:mb-3.5 max-[700px]:[&_.eyebrow]:text-[8px] [&_h2]:mb-3.25 [&_h2]:text-[30px] [&_h2]:tracking-[-0.7px] max-[700px]:[&_h2]:text-[26px] [&_p:not(.eyebrow)]:text-[12px] [&_p:not(.eyebrow)]:text-muted max-[700px]:[&_p:not(.eyebrow)]:text-[11px] [&.horizontal]:flex [&.horizontal]:items-center [&.horizontal]:justify-between max-[700px]:[&.horizontal]:flex-col max-[700px]:[&.horizontal]:items-start max-[700px]:[&.horizontal]:gap-2.5 max-[700px]:[&.horizontal_>_.text-link]:text-[11px]">
          <h2>{t('写得自然，运行轻巧。')}</h2>
          <p>{t('把复杂的转换交给编译器，把清晰的代码留给你。')}</p>
        </div>
        <div className="feature-grid mt-10.25 grid grid-cols-3 gap-11 max-[1150px]:gap-7.5 max-[700px]:mt-7 max-[700px]:grid-cols-1 max-[700px]:gap-6.5 max-[700px]:[&_.text-link]:col-2 max-[700px]:[&_.text-link]:text-[11px] [&_article]:border-t [&_article]:border-solid [&_article]:border-t-line [&_article]:pt-6.25 max-[700px]:[&_article]:grid max-[700px]:[&_article]:grid-cols-[40px_1fr] max-[700px]:[&_article]:gap-[0_18px] max-[700px]:[&_article]:pt-5 [&_h3]:mb-3.5 [&_h3]:text-[19px] [&_h3]:leading-[1.6] [&_h3]:tracking-[-0.3px] max-[700px]:[&_h3]:text-[18px] max-[700px]:[&_h3]:leading-[1.6] max-[700px]:[&_h3_br]:hidden [&_p]:mb-5.75 [&_p]:max-w-77.5 [&_p]:text-[12px] [&_p]:leading-[1.9] [&_p]:text-muted max-[700px]:[&_p]:mb-4 max-[700px]:[&_p]:max-w-full max-[700px]:[&_p]:text-[12px]">
          <article>
            <span className="feature-icon mb-5 grid h-9.25 w-9.25 place-items-center rounded-lg border border-solid border-line bg-surface font-mono text-[15px] leading-[normal] font-normal text-[#678947] max-[700px]:[grid-row:1_/_4] max-[700px]:mt-1">
              {'</>'}
            </span>
            <h3>
              {t('你的 TypeScript，')}
              <br />
              {t('就是模板语言。')}
            </h3>
            <p>
              {t('标准 TSX、函数组件、类型化 Props 与插槽。直接使用熟悉的编辑器提示与类型检查。')}
            </p>
            <a
              className="text-link inline-flex items-center gap-5 text-[12px] font-semibold text-brand hover:gap-6.5"
              href={href('/guide/components/')}
            >
              {t('认识组件')}
              <span>→</span>
            </a>
          </article>
          <article>
            <span className="feature-icon mb-5 grid h-9.25 w-9.25 place-items-center rounded-lg border border-solid border-line bg-surface font-mono text-[15px] leading-[normal] font-normal text-[#678947] max-[700px]:[grid-row:1_/_4] max-[700px]:mt-1">
              ↗
            </span>
            <h3>
              {t('数据变了，')}
              <br />
              {t('界面就跟着变。')}
            </h3>
            <p>
              {t('用 vm() 描述状态，直接修改属性。编译器连接数据与 DOM，让响应式更新自然发生。')}
            </p>
            <a
              className="text-link inline-flex items-center gap-5 text-[12px] font-semibold text-brand hover:gap-6.5"
              href={href('/guide/reactivity/')}
            >
              {t('理解响应式')}
              <span>→</span>
            </a>
          </article>
          <article>
            <span className="feature-icon mb-5 grid h-9.25 w-9.25 place-items-center rounded-lg border border-solid border-line bg-surface font-mono text-[15px] leading-[normal] font-normal text-[#678947] max-[700px]:[grid-row:1_/_4] max-[700px]:mt-1">
              ✳
            </span>
            <h3>
              {t('小巧的核心，')}
              <br />
              {t('完整的构建体验。')}
            </h3>
            <p>
              {t('Rust 编译器与 Vite 集成，搭配 HMR、路由、异步组件和国际化，逐步组成你的应用。')}
            </p>
            <a
              className="text-link inline-flex items-center gap-5 text-[12px] font-semibold text-brand hover:gap-6.5"
              href={href('/ecosystem/')}
            >
              {t('探索工具链')}
              <span>→</span>
            </a>
          </article>
        </div>
      </section>
      <section className="architecture-section border-y border-solid border-y-line bg-subtle">
        <div className="page-width architecture-inner mx-auto grid w-[min(1240px,_calc(100%_-_96px))] grid-cols-[0.85fr_1.15fr] items-center gap-22.5 py-16.25 max-[1150px]:w-[calc(100%_-_64px)] max-[1150px]:gap-12.5 max-[950px]:grid-cols-[0.8fr_1.2fr] max-[950px]:gap-6.25 max-[700px]:w-[calc(100%_-_40px)] max-[700px]:grid-cols-1 max-[700px]:gap-7.5 max-[700px]:py-10 max-[370px]:w-[calc(100%_-_30px)] [&_.text-link]:mt-2.5 [&_>_div_>_p:not(.eyebrow)]:max-w-80 [&_>_div_>_p:not(.eyebrow)]:text-[12px] [&_>_div_>_p:not(.eyebrow)]:leading-[1.95] [&_>_div_>_p:not(.eyebrow)]:text-muted max-[700px]:[&_>_div_>_p:not(.eyebrow)]:max-w-none max-[700px]:[&_>_div_>_p:not(.eyebrow)]:text-[12px] [&_h2]:mb-4.5 [&_h2]:text-[33px] [&_h2]:leading-[1.5] [&_h2]:tracking-[-0.8px] max-[950px]:[&_h2]:text-[29px] max-[700px]:[&_h2]:text-[27px] max-[700px]:[&_h2_br]:hidden">
          <div>
            <h2>
              {t('从表达，')}
              <br />
              {t('到每一次更新。')}
            </h2>
            <p>
              {t('没有虚拟 DOM。模板在构建时转成 DOM 操作和数据监听，运行时沿着这条连接更新界面。')}
            </p>
            <a
              className="text-link inline-flex items-center gap-5 text-[12px] font-semibold text-brand hover:gap-6.5"
              href={href('/api/compiler/')}
            >
              {t('看看编译器做了什么')}
              <span>→</span>
            </a>
          </div>
          <div
            className="architecture-diagram rounded-[13px] border border-solid border-line [background-image:radial-gradient(var(--line)_1px,_transparent_1px)] [background-size:16px_16px] p-7.5 max-[1150px]:p-5.5 max-[950px]:p-4.25 max-[700px]:p-6 max-[370px]:p-3.75"
            aria-label={t('TSX 模板经 Rust 编译器生成 DOM 操作和监听；Proxy 状态变化通知 DOM 更新')}
          >
            <div className="diagram-top grid grid-cols-[1fr_28px_1fr] items-center gap-3 max-[950px]:grid-cols-[1fr_18px_1fr] max-[950px]:gap-1.25 max-[700px]:grid-cols-[1fr_24px_1fr] max-[700px]:gap-2">
              <div className="diagram-node flex flex-col gap-2.25 rounded-lg border border-solid border-line bg-surface px-4 py-4.25 [box-shadow:0_3px_8px_#00000004] max-[950px]:p-3.25 max-[700px]:p-3.75 max-[370px]:p-2.75 [&_>_span:last-child:not(.node-index)]:text-[9px] [&_>_span:last-child:not(.node-index)]:text-muted max-[700px]:[&_>_span:last-child:not(.node-index)]:text-[8px] [&_code]:text-[9px] [&_code]:text-muted max-[950px]:[&_code]:text-[8px] max-[700px]:[&_code]:text-[9px] max-[370px]:[&_code]:text-[8px] [&_strong]:text-[14px] [&_strong]:font-semibold max-[950px]:[&_strong]:text-[12px] max-[700px]:[&_strong]:text-[13px]">
                <span className="node-index font-mono text-[8px] leading-[normal] font-normal tracking-[0.05em] text-muted">
                  01 / INPUT
                </span>
                <strong>{t('标准 TSX')}</strong>
                <code>{'<p>{state.count}</p>'}</code>
              </div>
              <span className="diagram-arrow text-center text-[20px] text-[#98ab81]">→</span>
              <div className="diagram-node compiler-node flex flex-col gap-2.25 rounded-lg border border-solid border-line bg-surface px-4 py-4.25 [box-shadow:0_3px_8px_#00000004] max-[950px]:p-3.25 max-[700px]:p-3.75 max-[370px]:p-2.75 [&_>_span:last-child:not(.node-index)]:text-[9px] [&_>_span:last-child:not(.node-index)]:text-muted max-[700px]:[&_>_span:last-child:not(.node-index)]:text-[8px] [&_code]:text-[9px] [&_code]:text-muted max-[950px]:[&_code]:text-[8px] max-[700px]:[&_code]:text-[9px] max-[370px]:[&_code]:text-[8px] [&_strong]:text-[14px] [&_strong]:font-semibold max-[950px]:[&_strong]:text-[12px] max-[700px]:[&_strong]:text-[13px] [&.compiler-node]:border-[#a9c979] [&.compiler-node]:bg-[color-mix(in_srgb,_var(--accent)_15%,_var(--surface))]">
                <span className="node-index font-mono text-[8px] leading-[normal] font-normal tracking-[0.05em] text-muted">
                  02 / BUILD
                </span>
                <strong>{t('Rust 编译器')}</strong>
                <span>{t('DOM 操作 + 数据监听')}</span>
              </div>
            </div>
            <div className="diagram-connector flex h-11.25 items-center justify-end gap-2 pr-8.75 text-[9px] text-muted [&_>_span:last-child]:ml-1.5 [&_>_span:last-child]:text-[24px]">
              <span>{t('编译建立连接')}</span>
              <span>↓</span>
            </div>
            <div className="diagram-bottom flex items-center justify-between gap-2.5">
              <div className="diagram-state grid grid-cols-[7px_1fr] items-center gap-1.75 rounded-[7px] border border-dashed border-[#9caf84] bg-surface px-3.5 py-3 max-[950px]:p-2.5 max-[700px]:p-3 max-[370px]:p-2.25 [&_code]:col-2 [&_code]:text-[9px] [&_code]:text-muted [&_strong]:text-[12px] [&_strong]:font-[550] max-[950px]:[&_strong]:text-[11px] max-[700px]:[&_strong]:text-[11px]">
                <span className="status-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#81a547]" />
                <strong>{t('Proxy 状态')}</strong>
                <code>state.count++</code>
              </div>
              <span className="update-wire text-[9px] whitespace-nowrap text-muted max-[950px]:text-[8px] max-[700px]:text-[8px] max-[370px]:text-[7px]">
                {t('通知更新 →')}
              </span>
              <div className="diagram-dom flex flex-col gap-1.25 rounded-lg border border-solid border-line bg-surface px-5 py-3 max-[950px]:px-2.75 max-[700px]:px-4.25 max-[700px]:py-3 max-[370px]:p-2.25 [&_strong]:text-[13px] [&_strong]:font-[550]">
                <span className="node-index font-mono text-[8px] leading-[normal] font-normal tracking-[0.05em] text-muted">
                  03 / RUNTIME
                </span>
                <strong>{t('真实 DOM')}</strong>
                <span className="dom-tag font-mono text-[10px] leading-[normal] font-normal text-[#769b4d]">
                  {'<p>1</p>'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="examples-section page-width mx-auto w-[min(1240px,_calc(100%_-_96px))] py-18.5 max-[1150px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_40px)] max-[700px]:py-10.75 max-[370px]:w-[calc(100%_-_30px)]">
        <div className="section-heading horizontal [&_.eyebrow]:mb-3.5 max-[700px]:[&_.eyebrow]:text-[8px] [&_h2]:mb-3.25 [&_h2]:text-[30px] [&_h2]:tracking-[-0.7px] max-[700px]:[&_h2]:text-[26px] [&_p:not(.eyebrow)]:text-[12px] [&_p:not(.eyebrow)]:text-muted max-[700px]:[&_p:not(.eyebrow)]:text-[11px] [&.horizontal]:flex [&.horizontal]:items-center [&.horizontal]:justify-between max-[700px]:[&.horizontal]:flex-col max-[700px]:[&.horizontal]:items-start max-[700px]:[&.horizontal]:gap-2.5 max-[700px]:[&.horizontal_>_.text-link]:text-[11px]">
          <div>
            <h2>{t('从一个例子开始。')}</h2>
            <p>{t('可以点击的预览，和它背后的每一行代码。')}</p>
          </div>
          <a
            className="text-link inline-flex items-center gap-5 text-[12px] font-semibold text-brand hover:gap-6.5"
            href={href('/examples/')}
          >
            {t('查看全部示例')}
            <span>↗</span>
          </a>
        </div>
        <div className="example-preview-grid mt-7.5 grid grid-cols-3 gap-5.5 max-[950px]:gap-4 max-[700px]:mt-6 max-[700px]:grid-cols-1 max-[700px]:gap-4.5">
          <a
            className="example-preview-card block overflow-hidden rounded-[9px] border border-solid border-line bg-surface hover:[transform:translateY(-4px)] hover:shadow-site"
            href={href('/examples/form-input/')}
          >
            <div className="mini-preview mini-form flex h-43.5 flex-col justify-center gap-3 bg-[#eff3e6] p-6.5 text-[#3b5735] max-[950px]:px-4.5 max-[700px]:h-42.5 max-[700px]:px-11.25 max-[700px]:py-7 [&_>_div_>_span]:text-[#6b903a] [&_>_div:not(.mini-check)]:flex [&_>_div:not(.mini-check)]:justify-between [&_>_div:not(.mini-check)]:rounded-[5px] [&_>_div:not(.mini-check)]:border [&_>_div:not(.mini-check)]:border-solid [&_>_div:not(.mini-check)]:border-[#c8d8b6] [&_>_div:not(.mini-check)]:bg-[#fff9] [&_>_div:not(.mini-check)]:px-3 [&_>_div:not(.mini-check)]:py-2.25 [&_>_div:not(.mini-check)]:text-[12px] [&_>_div:not(.mini-check)]:text-[#738368] max-[950px]:[&_>_div:not(.mini-check)]:text-[10px] max-[700px]:[&_>_div:not(.mini-check)]:text-[12px] [&_>_span]:font-mono [&_>_span]:text-[8px] [&_>_span]:leading-[normal] [&_>_span]:font-normal [&_>_span]:tracking-[0.12em]">
              <span>YOUR NEXT IDEA</span>
              <div>
                Build something small.<span>▏</span>
              </div>
              <div className="mini-check flex items-center gap-2 text-[10px] [&_i]:grid [&_i]:h-3.5 [&_i]:w-3.5 [&_i]:place-items-center [&_i]:rounded-[3px] [&_i]:bg-[#d3eaa7] [&_i]:text-[9px] [&_i]:not-italic">
                <i>✓</i>
                {t('让数据与输入保持同步')}
              </div>
            </div>
            <div className="preview-card-info flex items-center justify-between px-5.25 py-4.5 max-[700px]:px-5.5 max-[700px]:py-4 [&_>_span:last-child]:text-[17px] [&_>_span:last-child]:text-[#859578] [&_small]:mb-1.5 [&_small]:block [&_small]:font-mono [&_small]:text-[8px] [&_small]:leading-[normal] [&_small]:font-normal [&_small]:tracking-[0.08em] [&_small]:text-muted [&_strong]:text-[13px] [&_strong]:font-[550]">
              <span>
                <small>01 / BASICS</small>
                <strong>{t('表单与输入')}</strong>
              </span>
              <span>↗</span>
            </div>
          </a>
          <a
            className="example-preview-card block overflow-hidden rounded-[9px] border border-solid border-line bg-surface hover:[transform:translateY(-4px)] hover:shadow-site"
            href={href('/examples/slots/')}
          >
            <div className="mini-preview mini-slots flex h-43.5 flex-col items-center justify-center bg-[#edf0f4] p-6.5 text-[#526581] max-[950px]:px-4.5 max-[700px]:h-42.5 max-[700px]:px-11.25 max-[700px]:py-7 [&_>_div]:flex [&_>_div]:w-[92%] [&_>_div]:flex-col [&_>_div]:gap-2 [&_>_div]:rounded-[7px] [&_>_div]:border [&_>_div]:border-solid [&_>_div]:border-[#cbd4e1] [&_>_div]:bg-[#f9fbff] [&_>_div]:px-4.5 [&_>_div]:py-3 max-[700px]:[&_>_div]:max-w-67.5 [&_b]:border-y [&_b]:border-dashed [&_b]:border-y-[#d3dce9] [&_b]:px-0 [&_b]:py-2.5 [&_b]:text-[11px] [&_b]:font-medium [&_i]:self-end [&_i]:font-mono [&_i]:text-[7px] [&_i]:leading-[normal] [&_i]:font-normal [&_span]:font-mono [&_span]:text-[7px] [&_span]:leading-[normal] [&_span]:font-normal [&_span]:tracking-[0.09em]">
              <div>
                <span>HEADER</span>
                <b>{t('一个卡片，无限组合。')}</b>
                <span>CONTENT SLOT</span>
                <i>FOOTER ↗</i>
              </div>
            </div>
            <div className="preview-card-info flex items-center justify-between px-5.25 py-4.5 max-[700px]:px-5.5 max-[700px]:py-4 [&_>_span:last-child]:text-[17px] [&_>_span:last-child]:text-[#859578] [&_small]:mb-1.5 [&_small]:block [&_small]:font-mono [&_small]:text-[8px] [&_small]:leading-[normal] [&_small]:font-normal [&_small]:tracking-[0.08em] [&_small]:text-muted [&_strong]:text-[13px] [&_strong]:font-[550]">
              <span>
                <small>02 / COMPONENTS</small>
                <strong>{t('组件与插槽')}</strong>
              </span>
              <span>↗</span>
            </div>
          </a>
          <a
            className="example-preview-card block overflow-hidden rounded-[9px] border border-solid border-line bg-surface hover:[transform:translateY(-4px)] hover:shadow-site"
            href={href('/examples/router-navigation/')}
          >
            <div className="mini-preview mini-router flex h-43.5 flex-col justify-center bg-[#f1ede6] p-6.5 text-[#807057] max-[950px]:px-4.5 max-[700px]:h-42.5 max-[700px]:px-11.25 max-[700px]:py-7 [&_>_div]:flex [&_>_div]:min-h-23.5 [&_>_div]:rounded-[0_0_5px_5px] [&_>_div]:border [&_>_div]:border-t-0 [&_>_div]:border-solid [&_>_div]:border-[#e0d7ca] [&_>_div]:bg-[#fdfbf7] [&_>_span]:rounded-[5px_5px_0_0] [&_>_span]:border [&_>_span]:border-solid [&_>_span]:border-[#e0d7ca] [&_>_span]:bg-[#fbf9f5] [&_>_span]:px-2.75 [&_>_span]:py-1.25 [&_>_span]:font-mono [&_>_span]:text-[8px] [&_>_span]:leading-[normal] [&_>_span]:font-normal [&_article]:w-[73%] [&_article]:px-4.5 [&_article]:py-3 [&_article_b]:mb-3 [&_article_b]:block [&_article_b]:text-[11px] [&_article_span]:mb-1.5 [&_article_span]:block [&_article_span]:h-1 [&_article_span]:w-[80%] [&_article_span]:rounded-[2px] [&_article_span]:bg-[#ece7de] [&_article_span:last-child]:w-[50%] [&_aside]:flex [&_aside]:w-[27%] [&_aside]:flex-col [&_aside]:gap-2.5 [&_aside]:border-r [&_aside]:border-solid [&_aside]:border-r-[#e8e1d8] [&_aside]:px-3 [&_aside]:py-3.5 [&_aside_i]:h-1 [&_aside_i]:w-full [&_aside_i]:rounded-[2px] [&_aside_i]:bg-[#d9d0c0] [&_aside_i:first-child]:bg-[#b8c694]">
              <span>jinge.app / workspace</span>
              <div>
                <aside>
                  <i />
                  <i />
                  <i />
                </aside>
                <article>
                  <b>Overview</b>
                  <span />
                  <span />
                  <span />
                </article>
              </div>
            </div>
            <div className="preview-card-info flex items-center justify-between px-5.25 py-4.5 max-[700px]:px-5.5 max-[700px]:py-4 [&_>_span:last-child]:text-[17px] [&_>_span:last-child]:text-[#859578] [&_small]:mb-1.5 [&_small]:block [&_small]:font-mono [&_small]:text-[8px] [&_small]:leading-[normal] [&_small]:font-normal [&_small]:tracking-[0.08em] [&_small]:text-muted [&_strong]:text-[13px] [&_strong]:font-[550]">
              <span>
                <small>03 / APPLICATIONS</small>
                <strong>{t('路由与页面')}</strong>
              </span>
              <span>↗</span>
            </div>
          </a>
        </div>
      </section>
      <section className="start-section page-width relative mx-auto mb-18 grid w-[min(1240px,_calc(100%_-_96px))] grid-cols-[1.1fr_1fr] gap-12.5 overflow-hidden rounded-[13px] border border-solid border-line bg-subtle px-11.75 py-10.75 max-[1150px]:w-[calc(100%_-_64px)] max-[1150px]:px-9.25 max-[950px]:gap-6.25 max-[700px]:mb-10.5 max-[700px]:w-[calc(100%_-_40px)] max-[700px]:grid-cols-1 max-[700px]:gap-4.25 max-[700px]:px-6.5 max-[700px]:py-7.25 max-[370px]:w-[calc(100%_-_30px)] [&_.button]:min-h-10.25 [&_.button]:px-4.25 [&_.button]:py-2 [&_.button]:text-[12px] [&_.eyebrow]:text-[9px] max-[950px]:[&_.eyebrow]:text-[8px] [&_.quiet-link]:mt-3.75 [&_.quiet-link]:block [&_.quiet-link]:text-[10px] [&_>_div:nth-child(2)]:z-1 [&_>_div:nth-child(2)]:pt-1.75 [&_h2]:mb-0 [&_h2]:text-[30px] [&_h2]:leading-[1.5] [&_h2]:tracking-[-0.5px] max-[700px]:[&_h2]:text-[27px] [&_p:not(.eyebrow)]:text-[12px] [&_p:not(.eyebrow)]:leading-[1.9] [&_p:not(.eyebrow)]:text-muted max-[700px]:[&_p:not(.eyebrow)]:text-[12px]">
        <div>
          <h2>
            {t('下一个想法，')}
            <br />
            {t('用 Jinge 写出来。')}
          </h2>
        </div>
        <div>
          <p>
            {t('从第一个组件开始。')}
            <br />
            {t('安装、配置、运行，一步一步来。')}
          </p>
          <a
            className="button primary inline-flex min-h-11.75 items-center justify-center gap-8 rounded-[7px] px-5.5 py-2.75 text-[13px] font-semibold whitespace-nowrap [&.primary]:border [&.primary]:border-solid [&.primary]:border-[#c7e95f] [&.primary]:bg-accent [&.primary]:text-[#293d20] [&.primary:hover]:[transform:translateY(-2px)] [&.primary:hover]:bg-[#c4ed50] [&.secondary]:border [&.secondary]:border-solid [&.secondary]:border-line [&.secondary]:bg-surface [&.secondary]:text-ink [&.secondary:hover]:bg-subtle"
            href={href('/guide/quick-start/')}
          >
            {t('开始构建')}
            <span>↗</span>
          </a>
          <a
            className="quiet-link text-[12px] text-muted hover:text-ink"
            href={href('/guide/from-vue-react/')}
          >
            {t('熟悉 Vue / React？从这里出发 →')}
          </a>
        </div>
        <span
          className="start-decoration pointer-events-none absolute right-2.5 bottom-[-75px] [transform:rotate(-8deg)] [font-family:system-ui] text-[260px] leading-[1] font-[800] tracking-[-20px] text-[#8aa562] opacity-[0.065] max-[700px]:right-1.75 max-[700px]:bottom-[-45px] max-[700px]:text-[230px]"
          aria-hidden="true"
        >
          j.
        </span>
      </section>
    </main>
  );
}
