---
title: 執行時 API
description: 應用啟動、資料模型與生命週期。
group: API
---

## bootstrap

```ts
bootstrap(Component, container, props?, context?);
```

啟動根元件，返回元件宿主及暴露的引用。傳入非 body 的容器時，該佔位節點會被元件輸出替換；不要假設它始終保留。通常只啟動一次。

## vm / vmRaw / vmIgnore

```ts
const state = vm({ count: 0 });
const raw = vmRaw(state);
```

`vm()` 建立響應式物件或陣列，`vmRaw()` 取得原始資料。直接修改 raw 不會觸發 Proxy 通知。`vmIgnore()` 標記無需進行 VM 轉換的物件。

## watch / vmWatch

```ts
watch(state, 'count', handler, { immediate: true });
watch(state, ['user', 'name'], handler);
watch(state, handler);
const stop = vmWatch(state, 'count', handler);
```

`watch()` 綁定當前元件生命週期；`vmWatch()` 返回可手動解除監聽的函式。詳細行為見[偵聽與副作用](/guide/watch/)。

## onMount / onUnmount

```ts
onMount(() => {
  const unsubscribe = subscribe();
  return unsubscribe;
});
onUnmount(() => release());
```

在元件初始化期間註冊。掛載回撥可返回清理函式。

## ref / expose

```ts
const input = ref<HTMLInputElement>();
expose({ focus: () => input.value?.focus() });
```

Ref 持有 DOM 或元件引用，`expose()` 宣告對父元件開放的方法。見[生命週期](/guide/lifecycle/)。

## context

```ts
context(key, value); // 在祖先元件提供
const value = context<ValueType>(key); // 在後代元件讀取
```

key 支援字串或 Symbol。響應式由傳入值本身提供。

## nextTick / cx

`nextTick()` 用於等待框架已安排的更新；操作 DOM 前先等待更新完成。`cx()` 將條件類名組合為字串。

## 型別工具

`FC` 描述函式元件，`JNode` 描述模板節點，`WithSlots` 為預設、具名與函式插槽建立型別約束。以已安裝版本的型別宣告為簽名依據。

## 國際化 API

| API                                   | 用法與返回值                                                  |
| ------------------------------------- | ------------------------------------------------------------- |
| intlInit(options)                     | 初始化 defaultLocale、dicts 與可選的 dictLoader，返回 Promise |
| intlSetLocale(locale)                 | 非同步切換語言，必要時呼叫字典載入器，返回 Promise            |
| intlGetLocale()                       | 返回當前語言標識                                              |
| intlWatchLocale(callback, immediate?) | 監聽語言變化，返回解除監聽的函式                              |
| t(text, params?, options?)            | 配合編譯器處理文本、引數與富文本；options 可包含顯式 key      |

```ts
onUnmount(
  intlWatchLocale((locale) => {
    console.log('Current locale:', locale);
  }),
);
```

語言字典和模板編譯需要配套配置，參閱[國際化指南](/guide/i18n/)。不要將編譯器生成的內部 renderIntl 函式作為業務 API 使用。
