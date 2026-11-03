---
title: 路由 API
description: 建立路由、讀取狀態與觸發導航。
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

`routes` 必填；`mode` 預設 `html5`，可設為 `hash`；`baseHref` 預設 `/`。詳見[路由指南](/router/overview/)。

## Router / RouterView

```tsx
<Router router={router}>
  <RouterView />
</Router>
```

`Router` 提供上下文，`RouterView` 渲染當前層匹配的元件。父佈局中的 RouterView 渲染下一層。

## RouterHref

```tsx
<RouterHref to="/projects" activeClass="active" exactActiveClass="exact">
  Projects
</RouterHref>
```

渲染原生連結。支援 `to`、`className`、`activeClass`、`exactActiveClass`，不透傳任意連結屬性。啟用狀態匹配應使用不帶 query 的規範路徑。

## RouterLink

通過函式插槽自定義連結。插槽資料包含 `href`、`active`、`exactActive`。支援 `replace`、`open`、`noEvent`、`noActive` 等配置，完整行為以路由倉庫 README 為準。

## useNavigate

```ts
const navigate = useNavigate();
navigate('/users/2?tab=activity');
navigate('/login', { replace: true });
navigate(-1);
```

元件初始化時讀取導航函式，再在事件回撥中呼叫。字串目標應為以 `/` 開頭的路由內路徑；父級相對導航尚未實現。

## useParams / useQuery

```ts
const params = useParams<{ id: number }>();
const query = useQuery();
```

二者返回響應式 VM。`<T>` 只提供靜態型別，數字轉換由路徑中的 `<num>` 決定。query 值為字串，重複鍵取第一個。修改返回的物件不會觸發 URL 導航。
