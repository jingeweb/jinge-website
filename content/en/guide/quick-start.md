---
title: Quick start
description: From installing dependencies to your first reactive component.
group: Getting started
---

## Prerequisites

Use a recent Node.js LTS release and pnpm that satisfy the installed Vite version’s engine requirements. This website uses Node.js 26 and pnpm 12. Create an empty directory and install the following packages.

```sh
pnpm init
pnpm add jinge jinge-router
pnpm add -D jinge-compiler vite typescript
```

## Configure Vite

Enable `jingeVitePlugin()` so Jinge’s compiler handles your templates.

```ts
// vite.config.ts
import { jingeVitePlugin } from 'jinge-compiler';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [jingeVitePlugin()],
});
```

## Configure TypeScript

Keep JSX intact for the Jinge compiler. Do not enable React’s JSX transform. The following configuration enables strict checking and browser types.

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

## Create the entry point

Create `index.html` in the project root and `src/main.tsx` for your application. The HTML contains a placeholder that `bootstrap()` replaces with the component output.

```html
<!doctype html>
<html lang="en">
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

```tsx
import { bootstrap, vm } from 'jinge';

function App() {
  const state = vm({ count: 0 });
  return (
    <main>
      <h1>Hello, Jinge.</h1>
      <button on:click={() => state.count++}>Clicked {state.count} times</button>
    </main>
  );
}

bootstrap(App, document.getElementById('app')!);
```

## Develop and build

Start the development server, create a production build, and preview it locally. Vite writes production files to `dist/` by default. Deploy that directory to a static host. See [Deployment](/guide/deployment/) for SPA URL choices.

```sh
pnpm exec vite
pnpm exec vite build
pnpm exec vite preview
```
