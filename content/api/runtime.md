---
title: 运行时 API
description: 应用启动、数据模型与生命周期。
group: API
---

## bootstrap

```ts
bootstrap(Component, container, props?, context?);
```

启动根组件，返回组件宿主及暴露的引用。传入非 body 的容器时，该占位节点会被组件输出替换；不要假设它始终保留。通常只启动一次。

## vm / vmRaw / vmIgnore

```ts
const state = vm({ count: 0 });
const raw = vmRaw(state);
```

`vm()` 创建响应式对象或数组，`vmRaw()` 取得原始数据。直接修改 raw 不会触发 Proxy 通知。`vmIgnore()` 标记无需进行 VM 转换的对象。

## watch / vmWatch

```ts
watch(state, 'count', handler, { immediate: true });
watch(state, ['user', 'name'], handler);
watch(state, handler);
const stop = vmWatch(state, 'count', handler);
```

`watch()` 绑定当前组件生命周期；`vmWatch()` 返回可手动解除监听的函数。详细行为见[侦听与副作用](/guide/watch/)。

## onMount / onUnmount

```ts
onMount(() => {
  const unsubscribe = subscribe();
  return unsubscribe;
});
onUnmount(() => release());
```

在组件初始化期间注册。挂载回调可返回清理函数。

## ref / expose

```ts
const input = ref<HTMLInputElement>();
expose({ focus: () => input.value?.focus() });
```

Ref 持有 DOM 或组件引用，`expose()` 声明对父组件开放的方法。见[生命周期](/guide/lifecycle/)。

## context

```ts
context(key, value); // 在祖先组件提供
const value = context<ValueType>(key); // 在后代组件读取
```

key 支持字符串或 Symbol。响应式由传入值本身提供。

## nextTick / cx

`nextTick()` 用于等待框架已安排的更新；操作 DOM 前先等待更新完成。`cx()` 将条件类名组合为字符串。

## 类型工具

`FC` 描述函数组件，`JNode` 描述模板节点，`WithSlots` 为默认、具名与函数插槽建立类型约束。以已安装版本的类型声明为签名依据。

## 国际化 API

| API                                   | 用法与返回值                                                  |
| ------------------------------------- | ------------------------------------------------------------- |
| intlInit(options)                     | 初始化 defaultLocale、dicts 与可选的 dictLoader，返回 Promise |
| intlSetLocale(locale)                 | 异步切换语言，必要时调用字典加载器，返回 Promise              |
| intlGetLocale()                       | 返回当前语言标识                                              |
| intlWatchLocale(callback, immediate?) | 监听语言变化，返回解除监听的函数                              |
| t(text, params?, options?)            | 配合编译器处理文本、参数与富文本；options 可包含显式 key      |

```ts
onUnmount(
  intlWatchLocale((locale) => {
    console.log('Current locale:', locale);
  }),
);
```

语言字典和模板编译需要配套配置，参阅[国际化指南](/guide/i18n/)。不要将编译器生成的内部 renderIntl 函数作为业务 API 使用。
