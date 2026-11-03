---
title: Compiler API
description: The Rust compilation core and Vite integration.
group: API
---

## jingeVitePlugin

| Option                 | Purpose                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| importAlias            | `dev` or `source` for debugging and source-level development; normally omit it |
| intl                   | Enable internationalization; an object can configure `dropDefaultText`         |
| loadDebugNativeBinding | For local compiler development only                                            |

Development defaults to the dev entry. The plugin applies the same alias behavior to jinge-router. Production builds normally use production entries.

```ts
import { jingeVitePlugin } from 'jinge-compiler';

jingeVitePlugin({
  importAlias: 'dev',
  intl: { dropDefaultText: false },
});
```

## Internationalization tools

`intl-extract` extracts messages and `intl-compile` creates dictionary modules. Read the [internationalization guide](/guide/i18n/) and run the [example](/examples/i18n/).

## loadCompiler

For tool authors who need direct access to the native compiler binding. Normal Vite applications only need the plugin. Keep the underlying transform API and native platform packages on compatible versions.

```ts
import { loadCompiler } from 'jinge-compiler';
const compiler = loadCompiler({});
```

## Platforms and future integrations

The npm compiler currently loads a Node native binding for published macOS, Linux, and Windows platforms. Rspack support, a WASM compiler, and integration with Rspack through WASM are Playground prerequisites, rather than capabilities advertised as available today.
