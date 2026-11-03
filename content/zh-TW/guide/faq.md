---
title: 常見問題
description: 遇到問題時，從更新鏈路和工程配置開始。
group: 工程
---

## 為什麼修改變數後介面沒有變化？

確認資料經過 `vm()` 包裝，模板讀取的是 VM 屬性，並且 TSX 由 `jingeVitePlugin()` 編譯。普通變數快照、原始物件的直接修改，不會自動通知模板。

## 能直接使用 React 元件嗎？

TSX 是語法格式，不代表共享執行時。React 元件依賴 React 的渲染和狀態機制，不能直接當作 Jinge 元件使用。普通 DOM 庫可以通過 Ref 與生命週期接入。

## 支援服務端渲染嗎？

當前這套程式碼面向瀏覽器 DOM。官網通過構建指令碼生成靜態文件 HTML，再在瀏覽器啟動 Jinge；這不是框架級 SSR 或 hydration 能力的承諾。

## 為什麼重新整理路由頁面會 404？

History 模式需要伺服器回退，或者為公開路徑輸出真實 HTML。靜態 SPA 可選 hash 模式，見[部署](/guide/deployment/)。

## 有線上編輯器嗎？

目前提供可操作預覽與原始碼閱讀。Playground 已列入專案 TODO，前置工作是 jinge-compiler 接入 Rspack，並支援通過 WASM 形態接入 Rspack 的編譯鏈路。

## 如何報告問題？

到對應的 GitHub 倉庫提交 Issue，附最小復現、版本、瀏覽器與構建步驟。執行時、編譯器和路由倉庫可在[生態頁面](/ecosystem/)找到。
