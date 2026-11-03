---
title: 理念与历史
description: 没有指令，没有模板 DSL，只有组件。
group: 开始
---

## 一切皆是组件

Jinge 里没有「指令」这个词。

`if` 和 `for` 在多数框架中是模板指令、宏或语法糖，Jinge 把它们做成了**组件**。你在 TSX 里写的条件和循环，编译后就是货真价实的组件调用：

| 你写下的                                      | 编译器把它变成                                       |
| --------------------------------------------- | ---------------------------------------------------- |
| `cond ? <A /> : <B />`                        | `<If expect={cond} slot:else={<B />}><A /></If>`     |
| `list.map((item) => <Row key={item.id} … />)` | `<For loop={list} key={item.id}>{(each) => …}</For>` |

`<If>` 和 `<For>` 就是 `jinge` 直接导出的普通组件，接口也完全公开：

```tsx
<If expect={state.show} slot:else={'显示'}>
  隐藏
</If>

<For loop={state.items} key="id">
  {(each) => <Row item={each.data} index={each.index} />}
</For>
```

于是整个框架的心智模型收缩到三样东西：**组件、属性、插槽**。没有指令，没有模板 DSL，也没有需要额外记忆的语法规则 —— 你写的 TSX 就是最终的组件树。

更重要的是，控制流不是不可替换的语言原语。内置实现撑不住你的场景时，可以写自己的控制流组件显式使用；代价是放弃对应的语法糖，并自行承担 `For` 的 key 复用与 diff。我们计划让编译器支持指定语法糖的落点，到那时「不满意就自己实现」才算真正闭环。

## 标准 TSX，没有虚拟 DOM

模板就是 TSX，因此 TypeScript 的类型检查、IDE 补全、重构工具全部可用，组件的属性和插槽都有类型约束。运行时用 `vm()` 把普通对象包成 Proxy，改属性即更新界面；没有虚拟 DOM，也就没有 diff 与再渲染的一整套开销。

```tsx
function App() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>Count: {state.count}</button>;
}
```

## 轻是可以量化的

| 项目                 | 体积                   |
| -------------------- | ---------------------- |
| 框架库产物（压缩后） | 约 31 KB               |
| Hello World 构建产物 | 约 3 KB（gzip 1.4 KB） |
| HMR 运行时代码       | 约 100 行              |

体积不是省在功能上：内置国际化、泛型组件、插槽与上下文都在核心里，`jinge-router` 单独提供路由能力。

## 编译器用 Rust 写

`jinge-compiler` 基于 SWC，用 Rust 实现 TSX 到 DOM 操作的转换，同时提供 Vite 插件与国际化工具链。编译器负责把模板编译成精确的 DOM 与监听逻辑：保留默认文本的国际化提取、条件与循环的组件化，都发生在这一步。

## 演进历史

几个关键转折，按时间排列：

| 时间    | 变化                                                                                                                                              | 提交                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 2019.02 | 首个提交，框架与示例仓库 [jinge-demos](https://github.com/jingeweb/jinge-demos) 同日起步                                                          | [`3995937`](https://github.com/jingeweb/jinge/commit/3995937f47b27d058c9c4360455e577d707e0dd7)               |
| 2020.01 | [jinge-material](https://github.com/jingeweb/jinge-material) 发布 1.0.0，组件库首次上线，附带完整[文档站点](https://jingeweb.github.io/material/) | [`287422e`](https://github.com/jingeweb/jinge-material/commit/287422eabf206b79ae36aefef2e47ddece1bed9a)      |
| 2020.04 | [jinge-router](https://github.com/jingeweb/jinge-router) 独立成库                                                                                 | [`45fdb8e`](https://github.com/jingeweb/jinge-router/commit/45fdb8e9c4ac986c9dfcb5f2c359ba1f9428793d)        |
| 2020.05 | 用 TypeScript 重写框架（v2）                                                                                                                      | [`e57bfe8`](https://github.com/jingeweb/jinge/commit/e57bfe837ac8d7c02c68f9afbc013bca0915d6a5)               |
| 2020.06 | v3.0，跟进 webpack 5                                                                                                                              | [`d6a891e`](https://github.com/jingeweb/jinge/commit/d6a891ef1df2bd78ad14dac62046f3724772f329)               |
| 2022.05 | 模板编译器独立成仓库：TypeScript 实现，模板是类 Angular 的 HTML 文件                                                                              | [`46f4720`](https://github.com/jingeweb/jinge-compiler/commit/46f4720ab9ac80d7f2114301b000f93ba6e006d9)      |
| 2022.08 | [jinge-material](https://github.com/jingeweb/jinge-material) 停止维护，最后一个版本 3.0.3。**已过期**                                             | [`e4a3d51`](https://github.com/jingeweb/jinge-material/commit/e4a3d517c5f1431da4bc595b693712f505b88b5b)      |
| 2024.07 | 编译器用 Rust 重写，模板从 HTML 改为标准 TSX                                                                                                      | [`51fda81`](https://github.com/jingeweb/jinge-rust-compiler/commit/51fda8173ff7ff0a2779e5e67a295e905c66c02d) |
| 2025.02 | [jinge-antd](https://jinge-antd.embjs.com) 组件库开始实施，进行中                                                                                 | —                                                                                                            |
| 2026.11 | 在 AI 加持下完成 [jinge-antd](https://jinge-antd.embjs.com) 组件库并发布文档站，发布框架官网与文档（[jinge.embjs.com](https://jinge.embjs.com)）  | —                                                                                                            |

两次语言级重写（框架一次、编译器一次），一次模板范式迁移（HTML → TSX），这条线从 2019 年一直走到现在。
