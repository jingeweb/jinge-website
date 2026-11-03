---
title: 快速开始
description: 从安装依赖到第一个响应式组件。
group: 开始
---

## 环境准备

使用近期的 Node.js LTS 与 pnpm；工具版本应符合所安装 Vite 的 engines 要求。官网工程本身使用 Node.js 26 与 pnpm 12。新建一个空目录，然后安装：

```sh
pnpm init
pnpm add jinge jinge-router
pnpm add -D jinge-compiler vite typescript
```

## 配置 Vite

```ts
// vite.config.ts
import { jingeVitePlugin } from 'jinge-compiler';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [jingeVitePlugin()],
});
```

## 配置 TypeScript

让 Jinge 编译器处理 TSX，不要启用 React 的 JSX 转换。

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["vite/client"],
    "lib": ["ESNext", "DOM"]
  },
  "include": ["src"]
}
```

## 创建入口

在根目录创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Jinge App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

再创建 `src/main.tsx`：

```tsx
import { bootstrap, vm } from 'jinge';

function App() {
  const state = vm({ count: 0 });
  return (
    <main>
      <h1>Hello, Jinge.</h1>
      <button on:click={() => state.count++}>点击了 {state.count} 次</button>
    </main>
  );
}

bootstrap(App, document.getElementById('app')!);
```

## 启动与构建

```sh
pnpm exec vite
pnpm exec vite build
pnpm exec vite preview
```

Vite 默认把生产产物写入 `dist/`。将该目录部署到静态服务器即可。SPA 的 URL 选择见[部署](/guide/deployment/)。
