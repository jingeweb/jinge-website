---
title: 编译器 API
description: Rust 编译核心与 Vite 集成。
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

| 选项                   | 作用                                                    |
| ---------------------- | ------------------------------------------------------- |
| importAlias            | `dev` 或 `source`，用于调试与源码联调；常规应用无需设置 |
| intl                   | 启用国际化，可用对象配置 `dropDefaultText`              |
| loadDebugNativeBinding | 仅用于编译器自身本地开发                                |

开发模式默认使用 dev 入口，插件同时为 jinge-router 设置对应别名。生产构建使用生产入口。

## 国际化工具

`intl-extract` 提取待翻译文本，`intl-compile` 将翻译内容生成字典模块。参阅[国际化指南](/guide/i18n/)和[示例](/examples/i18n/)。

## loadCompiler

```ts
import { loadCompiler } from 'jinge-compiler';
const compiler = loadCompiler({});
```

供需要直接调用原生编译绑定的工具作者使用。常规 Vite 应用只需插件。底层 transform 接口与原生平台包应保持版本一致。

## 平台与后续集成

当前 npm 编译器通过 Node 原生绑定加载平台包，覆盖 macOS、Linux 与 Windows 的已发布平台。Rspack 适配、WASM 编译器以及通过 WASM 接入 Rspack，列为 Playground 的前置工作；当前网站不将它们标为已支持。
