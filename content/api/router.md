---
title: 路由 API
description: 创建路由、读取状态与触发导航。
group: API
---

## createRouter

```ts
const router = createRouter({
  mode: 'html5',
  baseHref: '/',
  routes: [{ path: '/', component: Home }],
});
```

`routes` 必填；`mode` 默认 `html5`，可设为 `hash`；`baseHref` 默认 `/`。详见[路由指南](/router/overview/)。

## Router / RouterView

```tsx
<Router router={router}>
  <RouterView />
</Router>
```

`Router` 提供上下文，`RouterView` 渲染当前层匹配的组件。父布局中的 RouterView 渲染下一层。

## RouterHref

```tsx
<RouterHref to="/projects" activeClass="active" exactActiveClass="exact">
  Projects
</RouterHref>
```

渲染原生链接。支持 `to`、`className`、`activeClass`、`exactActiveClass`，不透传任意链接属性。激活状态匹配应使用不带 query 的规范路径。

## RouterLink

通过函数插槽自定义链接。插槽数据包含 `href`、`active`、`exactActive`。支持 `replace`、`open`、`noEvent`、`noActive` 等配置，完整行为以路由仓库 README 为准。

## useNavigate

```ts
const navigate = useNavigate();
navigate('/users/2?tab=activity');
navigate('/login', { replace: true });
navigate(-1);
```

组件初始化时读取导航函数，再在事件回调中调用。字符串目标应为以 `/` 开头的路由内路径；父级相对导航尚未实现。

## useParams / useQuery

```ts
const params = useParams<{ id: number }>();
const query = useQuery();
```

二者返回响应式 VM。`<T>` 只提供静态类型，数字转换由路径中的 `<num>` 决定。query 值为字符串，重复键取第一个。修改返回的对象不会触发 URL 导航。
