---
title: 快速開始
description: 從安裝依賴到第一個響應式元件。
group: 開始
---

## 環境準備

使用近期的 Node.js LTS 與 pnpm；工具版本應符合所安裝 Vite 的 engines 要求。官網工程本身使用 Node.js 26 與 pnpm 12。新建一個空目錄，然後安裝：

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

讓 Jinge 編譯器處理 TSX，不要啟用 React 的 JSX 轉換。

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

## 建立入口

在根目錄建立 `index.html`：

```html
<!doctype html>
<html lang="zh-TW">
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

再建立 `src/main.tsx`：

```tsx
import { bootstrap, vm } from 'jinge';

function App() {
  const state = vm({ count: 0 });
  return (
    <main>
      <h1>Hello, Jinge.</h1>
      <button on:click={() => state.count++}>點選了 {state.count} 次</button>
    </main>
  );
}

bootstrap(App, document.getElementById('app')!);
```

## 啟動與構建

```sh
pnpm exec vite
pnpm exec vite build
pnpm exec vite preview
```

Vite 預設把生產產物寫入 `dist/`。將該目錄部署到靜態伺服器即可。SPA 的 URL 選擇見[部署](/guide/deployment/)。
