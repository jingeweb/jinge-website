import { t } from 'jinge';

import { setMeta } from '../data';
import { href } from '../i18n';

const packages = [
  {
    number: '01',
    name: 'jinge',
    tag: 'RUNTIME',
    text: t('响应式 ViewModel、函数组件、DOM 更新、生命周期与内置国际化。界面背后，小巧的运行时。'),
    href: 'https://github.com/jingeweb/jinge',
    doc: '/api/runtime/',
  },
  {
    number: '02',
    name: 'jinge-compiler',
    tag: 'COMPILER',
    text: t('基于 Rust 与 SWC，将标准 TSX 转为 DOM 操作和数据监听，提供 Vite 与国际化工具链。'),
    href: 'https://github.com/jingeweb/jinge-rust-compiler',
    doc: '/api/compiler/',
  },
  {
    number: '03',
    name: 'jinge-router',
    tag: 'ROUTER',
    text: t('轻量 SPA 路由。嵌套布局、响应式参数、query 与导航，让页面自然连接。'),
    href: 'https://github.com/jingeweb/jinge-router',
    doc: '/router/overview/',
  },
  {
    number: '04',
    name: 'jinge-antd',
    tag: 'COMPONENTS',
    text: t(
      '面向 PC 中台的 Ant Design 风格组件库。表单、表格、弹层等常用界面，沿用统一的交互与视觉。',
    ),
    href: 'https://github.com/jingeweb/jinge-antd',
    doc: 'https://jinge-antd.embjs.com/',
    external: true,
  },
];

export function Ecosystem() {
  setMeta(t('生态与关于'), t('了解 Jinge 的运行时、编译器、路由、组件库与开源贡献。'));
  return (
    <main
      id="main-content"
      className="ecosystem-page page-width mx-auto w-[min(1240px,_calc(100%_-_96px))] pb-16.25 max-[1150px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_40px)] max-[700px]:pb-8.75 max-[370px]:w-[calc(100%_-_30px)]"
    >
      <header className="page-intro pt-16.25 pb-9.5 max-[700px]:pt-9.5 max-[700px]:pb-6.25 [&_.eyebrow]:mb-4.75 max-[700px]:[&_.eyebrow]:text-[8px] [&_>_p:not(.eyebrow)]:text-[14px] [&_>_p:not(.eyebrow)]:leading-[1.9] [&_>_p:not(.eyebrow)]:text-muted max-[700px]:[&_>_p:not(.eyebrow)]:text-[12px] [&_h1]:mb-5 [&_h1]:text-[43px] [&_h1]:tracking-[-1.2px] max-[700px]:[&_h1]:text-[31px] max-[700px]:[&_h1]:tracking-[-0.7px]">
        <p className="eyebrow font-mono text-[10px] leading-[1.5] font-semibold tracking-[0.16em] text-muted">
          SMALL PIECES, CONNECTED.
        </p>
        <h1>
          {t('小巧的核心，')}
          <br />
          {t('一起生长')}
          <span className="end-dot text-[#91ac55]">.</span>
        </h1>
        <p>{t('每个部分各司其职，一起构成 Jinge 的开发体验。')}</p>
      </header>
      <div className="package-grid grid grid-cols-[1fr_1fr] gap-5.75 max-[700px]:grid-cols-1 max-[700px]:gap-4.25">
        {packages.map((pkg) => (
          <article
            className="package-card rounded-[9px] border border-solid border-line bg-surface px-7.5 py-6.75 max-[700px]:p-5.75 [&_.quiet-link]:text-[11px] [&_.text-link]:text-[11px] [&_>_div:last-child]:mt-6 [&_>_div:last-child]:flex [&_>_div:last-child]:gap-6.25 [&_h2]:mx-0 [&_h2]:mt-5.75 [&_h2]:mb-4.25 [&_h2]:font-mono [&_h2]:text-[23px] [&_h2]:leading-[normal] [&_h2]:font-semibold [&_h2]:tracking-[-0.8px] max-[700px]:[&_h2]:mt-4.75 max-[700px]:[&_h2]:text-[22px] [&_p]:min-h-17.25 [&_p]:max-w-97.5 [&_p]:text-[12px] [&_p]:leading-[1.95] [&_p]:text-muted max-[700px]:[&_p]:min-h-0 max-[700px]:[&_p]:text-[12px]"
            key={pkg.name}
          >
            <div className="package-top flex items-center justify-between [&_>_a]:text-[20px] [&_>_a]:text-muted [&_>_span]:font-mono [&_>_span]:text-[9px] [&_>_span]:leading-[normal] [&_>_span]:font-normal [&_>_span]:tracking-[0.08em] [&_>_span]:text-muted">
              <span>
                {pkg.number} / {pkg.tag}
              </span>
              <a
                href={href(pkg.href)}
                aria-label={t('在 GitHub 查看 {name}', { name: pkg.name })}
                target="_blank"
                rel="noreferrer"
              >
                ↗
              </a>
            </div>
            <h2>{pkg.name}</h2>
            <p>{pkg.text}</p>
            <div>
              <a
                className="text-link inline-flex items-center gap-5 text-[12px] font-semibold text-brand hover:gap-6.5"
                href={href(pkg.doc)}
                target={pkg.external ? '_blank' : undefined}
                rel={pkg.external ? 'noreferrer' : undefined}
              >
                {t('阅读文档 →')}
              </a>
              <a
                className="quiet-link text-[12px] text-muted hover:text-ink"
                href={href(pkg.href)}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      <section className="contribution-section mt-18.75 grid grid-cols-[1fr_1fr] gap-25 border-t border-solid border-t-line pt-12.5 max-[700px]:mt-10.75 max-[700px]:grid-cols-1 max-[700px]:gap-8.25 max-[700px]:pt-8 [&_.button]:text-[12px] [&_>_div_>_p:not(.eyebrow)]:mb-6.25 [&_>_div_>_p:not(.eyebrow)]:max-w-85 [&_>_div_>_p:not(.eyebrow)]:text-[12px] [&_>_div_>_p:not(.eyebrow)]:leading-[1.95] [&_>_div_>_p:not(.eyebrow)]:text-muted [&_h2]:text-[31px] [&_h2]:leading-[1.6] [&_h2]:tracking-[-0.5px] max-[700px]:[&_h2]:text-[28px]">
        <div>
          <p className="eyebrow font-mono text-[10px] leading-[1.5] font-semibold tracking-[0.16em] text-muted">
            OPEN SOURCE, OPEN IDEAS.
          </p>
          <h2>
            {t('一起把细节，')}
            <br />
            {t('做得更好。')}
          </h2>
          <p>{t('一个可复现的问题、一段更清楚的解释、一个小功能，都是让框架向前的方式。')}</p>
          <a
            className="button primary inline-flex min-h-11.75 items-center justify-center gap-8 rounded-[7px] px-5.5 py-2.75 text-[13px] font-semibold whitespace-nowrap [&.primary]:border [&.primary]:border-solid [&.primary]:border-[#c7e95f] [&.primary]:bg-accent [&.primary]:text-[#293d20] [&.primary:hover]:[transform:translateY(-2px)] [&.primary:hover]:bg-[#c4ed50] [&.secondary]:border [&.secondary]:border-solid [&.secondary]:border-line [&.secondary]:bg-surface [&.secondary]:text-ink [&.secondary:hover]:bg-subtle"
            href={href('https://github.com/jingeweb/jinge/issues')}
            target="_blank"
            rel="noreferrer"
          >
            {t('参与贡献 ↗')}
          </a>
        </div>
        <div className="contribution-steps [&_a]:text-[11px] [&_a]:text-brand [&_article]:mb-7.5 [&_article]:flex [&_article]:gap-4.5 max-[700px]:[&_article]:mb-6.25 [&_article_>_span]:pt-0.75 [&_article_>_span]:font-mono [&_article_>_span]:text-[11px] [&_article_>_span]:leading-[normal] [&_article_>_span]:font-normal [&_article_>_span]:text-[#9cab8a] [&_h3]:mb-2.25 [&_h3]:text-[15px] [&_p]:mb-2 [&_p]:text-[12px] [&_p]:text-muted">
          <article>
            <span>01</span>
            <div>
              <h3>{t('报告问题')}</h3>
              <p>{t('提供版本、运行环境与最小复现，将问题提交到对应仓库。')}</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>{t('完善文档')}</h3>
              <p>{t('文档页底部可以直接进入编辑。欢迎补充示例、修正说明。')}</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>{t('跟进版本')}</h3>
              <p>{t('通过 GitHub Releases 阅读发布记录，按项目需求升级。')}</p>
              <a
                href={href('https://github.com/jingeweb/jinge/releases')}
                target="_blank"
                rel="noreferrer"
              >
                {t('查看发布记录 ↗')}
              </a>
            </div>
          </article>
        </div>
      </section>
      <section className="ecosystem-license mt-6.25 border-t border-solid border-t-line pt-6.25 max-[700px]:mt-2.5 [&_h2]:text-[14px] [&_p]:text-[11px] [&_p]:text-muted">
        <h2>{t('关于项目与许可')}</h2>
        <p>
          {t(
            'Jinge 由 Yuhang Ge 创建。运行时与编译器当前使用 AGPL-3.0，路由与示例包声明为 ISC；具体以各仓库 LICENSE 与包元数据为准。',
          )}
        </p>
        <p>{t('本官网使用 Jinge 构建，静态页面由 GitHub Pages 托管。')}</p>
      </section>
    </main>
  );
}
