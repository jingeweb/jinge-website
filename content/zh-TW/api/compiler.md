---
title: 編譯器 API
description: Rust 編譯核心與 Vite 整合。
group: API
---

## jingeVitePlugin

```ts
import { jingeVitePlugin } from 'jinge-compiler';

jingeVitePlugin({
  importAlias: 'dev',
  intl: { dropDefaultText: false },
});
```

| 選項                   | 作用                                                      |
| ---------------------- | --------------------------------------------------------- |
| importAlias            | `dev` 或 `source`，用於除錯與原始碼聯調；常規應用無需設定 |
| intl                   | 啟用國際化，可用物件配置 `dropDefaultText`                |
| loadDebugNativeBinding | 僅用於編譯器自身本地開發                                  |

開發模式預設使用 dev 入口，外掛同時為 jinge-router 設定對應別名。生產構建使用生產入口。

## 國際化工具

`intl-extract` 提取待翻譯文本，`intl-compile` 將翻譯內容生成字典模組。參閱[國際化指南](/guide/i18n/)和[示例](/examples/i18n/)。

## loadCompiler

```ts
import { loadCompiler } from 'jinge-compiler';
const compiler = loadCompiler({});
```

供需要直接呼叫原生編譯繫結的工具作者使用。常規 Vite 應用只需外掛。底層 transform 介面與原生平臺包應保持版本一致。

## 平臺與後續整合

當前 npm 編譯器通過 Node 原生繫結載入平臺包，覆蓋 macOS、Linux 與 Windows 的已釋出平臺。Rspack 適配、WASM 編譯器以及通過 WASM 接入 Rspack，列為 Playground 的前置工作；當前網站不將它們標為已支援。
