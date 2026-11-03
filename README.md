# Jinge 官网

使用 Jinge 4.2、jinge-router 和 Rust 编译器构建的官方网站，目标域名为 **https://jinge.embjs.com**，通过 GitHub Pages 部署。

包含简中、繁中、英语三个完整版本：每种语言有产品首页、23 篇指南/API/路由文档、19 个可运行示例、源码查看与本地全文搜索，支持明暗主题和移动端布局。Playground 的 Rspack / WASM 前置工作记录在 [TODO.md](TODO.md)。

## 开发

使用 Node.js 26、pnpm 12.16.1。依赖已从 npm 官方 registry 核对最新稳定版本，并由 lockfile 固定。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

终端会输出本地地址。所有样式与字体均可在本地工作，不依赖第三方 CDN。

```sh
pnpm lint       # 内容生成、TypeScript、Oxlint 类型感知检查、Oxfmt
pnpm format     # 格式化
pnpm build      # 单页入口构建与产物检查
pnpm preview    # Vite 预览构建产物
pnpm serve      # 模拟 GitHub Pages 的静态预览（含 404 回退）
```

Husky 的 pre-commit 执行 lint-staged，检查并格式化暂存的代码与内容。Oxc 不启用 React 专用规则，因为本项目使用 Jinge 的可变 VM 与生命周期。

## Tailwind 样式

官网使用 Tailwind CSS 4，通过 `@tailwindcss/vite` 编译。布局、颜色、间距、交互状态与响应式样式写在 TSX 的 utility classes 中；语义类名保留用于定位组件与交互测试。

`src/style.css` 负责 Tailwind 入口、主题变量、基础规则与 Markdown 排版。主题颜色通过 `@theme inline` 注册，`dark:` 对应现有的 `data-theme="dark"`。Markdown 与代码块的结构由构建脚本生成，统一使用 `@layer components` / `@apply` 管理排版。

Tailwind 的扫描范围明确限定在官网组件、页面、入口和内容构建脚本，不扫描示例快照与生成目录。样式类名应以完整的静态字符串书写，动态切换时从完整类名中选择。Oxfmt 会根据 `src/style.css` 自动排序 Tailwind classes，也支持 `cx()`。

沿用原有基础规则，没有引入完整 Preflight 重置。`demos/` 中的教学示例仍保留各自 CSS，并在独立 iframe 中运行。

## 目录与内容

- `src/`：Jinge 页面、布局、全局搜索与主题。
- `content/guide`、`content/api`、`content/router`：简中 Markdown 文档；`content/zh-TW/` 与 `content/en/` 为完整的繁中、英文文档。均使用 title / description / group 元数据。
- `intl/`：翻译源目录，见 [intl/readme.md](intl/readme.md)。`translate.csv` 管界面文案（`t()`，由 `intl-extract` 维护），`demos.csv` 管示例源码里的展示文本（由 `localizeSource` 套用）。两者都要提交。
- `demos/manifest.json`：示例的标题、描述、分类，直接按语言存放。
- `src/locale.ts`、`src/i18n.ts`：语言路径、`intlInit` 字典加载、语言切换与章节定位。
- `demos/`：从 jinge-demos 引入的源码快照与独立路由演示。来源和适配说明见 [demos/README.md](demos/README.md)。
- `scripts/content.mjs`：编译 Markdown、Shiki 高亮、搜索数据、示例源码和示例预览入口。
- `scripts/source-i18n.mjs`：校验文案完整性、生成繁中文案，并用 TypeScript AST 翻译示例的显示文本，保留标识符、导入与响应式绑定。
- `scripts/intl.mjs`：跑 `intl-extract` → 填充翻译列 → `intl-compile`，产出 `intl/<locale>.tsx` 字典。
- `scripts/verify-build.mjs`：检查单页入口、404 回退、示例预览与文档数据。
- `scripts/serve.mjs`：模拟 Pages 的静态服务器：只按真实文件查找，未知路径返回 `404.html`，用于本地验证 SPA 回退。
- `public/`：CNAME、favicon、robots。

`src/generated/`、`intl/`、`site/` 都是生成目录，已被 gitignore，不应手动编辑或提交。`site/` 是 Vite 的 `root`，只放两样东西：单页入口 `site/index.html`（外加 `site/404.html` 回退页）和每个示例预览的真实 HTML（`site/<locale>/preview/<id>/index.html`，被 iframe 直接加载）。`site/dist/` 是最终发布产物。新增文档后运行 `pnpm content`；开发服务会在内容变化后重新生成并刷新。

站点是**纯单页应用**：文档、首页、示例列表都由客户端路由渲染，仓库里没有每路由的静态 HTML。GitHub Pages 无法配置 rewrite，所以访问任意深链时由 `404.html` 把原路径交给入口页还原（`?__git_pages_redirect=`），HTTP 状态码是 404 —— 这是当前部署方式的取舍，换成支持 rewrite 的服务器即可去掉这一步。

## 多语言

| 语言             | 地址                                   |
| ---------------- | -------------------------------------- |
| 简体中文（默认） | `/zh-CN/`、`/zh-CN/guide/quick-start/` |
| 繁體中文         | `/zh-TW/`、`/zh-TW/guide/quick-start/` |
| English          | `/en/`、`/en/guide/quick-start/`       |

三种语言都有前缀。`/` 不是内容页：入口在渲染前把「本地偏好 → `navigator.language` → 简体中文」算出的语言写回 URL（`replaceState`，不产生跳转）。首段不是已知语言时整段被丢弃，不会落进 404。

页头的语言选择器在切换时保留当前页面与 query，并按章节顺序映射到对应语言的锚点。**只有手动切换才会写入 `localStorage`（键 `jinge-locale`）**；自动判断只读取、不写入。显式带前缀的 URL 永远优先。

界面文案走 **jinge 框架自带的 i18n**：源码里写 `t('简中文案')`、带参数写 `t('你好，{name}！', { name })`。`intl/translate.csv` 是翻译的唯一来源并随仓库提交：`scripts/intl.mjs` 先跑 `intl-extract` 把新文案追加成空行，然后校验每个 key 的三种语言都非空（缺翻译直接构建失败），最后 `intl-compile` 生成 `intl/<locale>.tsx`，运行时由 `intlInit` 的 `dictLoader` 按需加载。**新增文案时在 CSV 的对应列填翻译即可**，不需要改代码。

英文正文独立维护在 `content/en/`，繁中正文在 `content/zh-TW/`。新增文档时请补齐两个翻译版本；新增界面文案只需写 `t()`，并在 `locales/messages.en.json` 补一条英文。

示例保留原始文件，构建时生成各语言的独立源码、预览入口与源码展示文件，确保预览与所展示的源码一致。国际化示例本身使用 Jinge 的原生国际化能力，支持简中、繁中、英语三个字典。OpenCC 和 TypeScript AST 处理均只发生在构建阶段，不需要浏览器下载转换器。

## GitHub Pages

1. 将仓库推送到 GitHub，默认分支为 `main`。
2. 在 Settings → Pages 中将 Source 设为 **GitHub Actions**。
3. 将 Custom domain 设为 **jinge.embjs.com**。
4. 在域名服务商处，将 `jinge` 的 CNAME 指向 Pages 所属账号的 `<owner>.github.io`。
5. 域名验证与证书就绪后启用 Enforce HTTPS。

工作流在 PR 上执行校验与构建；在 main 推送或手动运行时发布 `site/dist/`。`public/CNAME` 同时进入产物。静态资源以自定义域名根路径 `/` 为基准，不用于 `<owner>.github.io/<repo>/` 子路径预览。

本地仓库目前没有配置远端。工作流、域名声明已准备好；实际推送、Pages 设置和 DNS 生效后才是线上发布完成。

## 许可

官网源码使用 AGPL-3.0，见 [LICENSE](LICENSE)。引入的示例与第三方依赖保留各自的许可声明。
