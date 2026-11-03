---
title: 構建與部署
description: 把應用交付為靜態資源。
group: 工程
---

## 生產構建

```sh
pnpm exec vite build
pnpm exec vite preview
```

Vite 外掛預設在開發模式解析到 `jinge/dev`，生產構建使用正常的生產入口。HMR 服務於開發階段，生產包依賴 Tree Shaking 去除相關程式碼。

## History 與 hash

HTML5 History 路由需要伺服器將未知頁面路徑回退到入口 HTML。GitHub Pages 沒有通用的伺服器 rewrite 配置；簡單 SPA 可以使用 hash 模式，公開文件站也可以在構建時為每個路徑輸出真實 HTML。

```ts
const router = createRouter({
  mode: 'hash',
  routes: [{ path: '/', component: Home }],
});
```

## 子目錄部署

Vite 的 `base` 管理靜態資源路徑；路由的 `baseHref` 管理路由路徑字首。這兩個配置承擔不同職責。在 hash 模式下，`baseHref` 位於 hash 內，不要因為 HTML 部署在子目錄就機械地新增同樣的路由字首。

## 官網如何部署

本官網為文件和示例頁面生成獨立 HTML，站內導航使用 jinge-router。已知路徑重新整理時由 Pages 返回真實檔案；未知路徑顯示 404。`public/CNAME` 宣告域名 `jinge.embjs.com`。

專案提供 GitHub Actions 工作流。倉庫 Settings → Pages 的來源選擇 GitHub Actions，然後在域名 DNS 中將 `jinge` 的 CNAME 指向所屬賬號的 `賬號.github.io`。Pages 中配置自定義域名並啟用 HTTPS。

## 相容與驗證

上線前測試直接訪問子頁、前進後退、資源載入和移動端佈局。框架和編譯器應使用相容版本；當前官網鎖定 Jinge 4.2 系列。
