---
title: 内置组件
description: 控制结构、动态内容和过渡。
group: API
---

## If

用于条件渲染。日常模板可使用三元表达式与 `&&`，由编译器生成相应的控制结构。查看[条件示例](/examples/if/)。

```tsx
<If expect={state.visible} slot:else={<p>内容已隐藏</p>}>
  <p>现在可以看到我。</p>
</If>
```

`expect` 为布尔值；默认插槽在真分支渲染，`slot:else` 是可选的假分支。切换时旧分支的组件会被销毁。

## For

```tsx
<For loop={state.items}>{(item) => <p>{item.data.title}</p>}</For>
```

遍历响应式列表。模板 `.map()` 是更简洁的写法；编译器识别根元素 key 以配置列表匹配。

| 属性 / 插槽值              | 含义                                      |
| -------------------------- | ----------------------------------------- |
| loop                       | 数组，也可为 null 或 undefined            |
| key                        | 数据字段名，或导出的 KEY_INDEX / KEY_DATA |
| item.data                  | 当前数据项                                |
| item.index                 | 当前索引                                  |
| item.isFirst / item.isLast | 是否首项 / 末项                           |

```tsx
<For loop={state.items} key="id">
  {(item) => (
    <p>
      {item.index + 1}. {item.data.title}
    </p>
  )}
</For>
```

稳定的业务 ID 有助于列表重排时保留对应节点与输入状态。

## Dynamic

```tsx
<Dynamic fc={state.current} title={state.title} />
```

`fc` 为组件函数。类型改变会重建实例，其他属性传递给当前组件。

## lazy / Lazy

```tsx
const Panel = lazy(() => import('./panel').then((m) => m.Panel), {
  'slot:loading': <p>正在加载</p>,
  'slot:error': (props) => <p>{props.error.message}</p>,
});
```

`lazy()` 创建可使用的异步组件，底层由 `Lazy` 管理加载、错误与销毁。loader 必须返回组件函数。

## Portal

用于把内容渲染到目标容器。它解决挂载位置问题；完整弹层仍需要处理焦点与键盘行为。

```tsx
<Portal target={document.body}>
  <div role="status">内容会出现在目标容器中。</div>
</Portal>
```

`target` 是可选的 HTMLElement，默认 document.body，在初始化时读取。Portal 中的内容随所属组件销毁。

## Transition / TransitionGroup

组件进入离开与列表动画依赖对应 CSS 过渡类。参阅[过渡示例的完整源码](/examples/transition/)，把类名、时长和列表结构一起配置。

| Transition 属性                     | 含义                               |
| ----------------------------------- | ---------------------------------- |
| isEnter                             | 为真时进入，为假时离开             |
| appear                              | 首次渲染是否应用动画，默认 false   |
| destroyAfterLeave                   | 离开结束后是否销毁内容，默认 false |
| enterClass / leaveClass             | 对应进入与离开的目标样式类         |
| enterActiveClass / leaveActiveClass | 动画执行期间的激活样式类           |

可通过 `on:beforeEnter`、`on:afterEnter`、`on:enterCancelled`、`on:beforeLeave`、`on:afterLeave`、`on:leaveCancelled` 注册回调。内容应只有一个根 Element。`TransitionGroup` 结合列表的 loop、key 与过渡类处理每个列表项。
