---
title: 参数、Query 与导航
description: URL 改变时，复用页面并更新数据。
group: 路由
---

## 读取响应式参数

```tsx
function User() {
  const params = useParams<{ id: number }>();
  const query = useQuery();
  watch(params, 'id', (id) => loadUser(id), { immediate: true });
  return (
    <p>
      User {params.id} · {query.tab ?? 'overview'}
    </p>
  );
}
```

路由声明 `/users/:id<num>` 时，id 在运行时转换为数字。路径参数包含祖先层级，重名时以子路由为准。

## 参数变化不会重建页面

仅参数或 query 变化时，已匹配的组件会复用。模板继续读取 VM 属性即可更新；数据加载等副作用要监听属性变化。

## 触发导航

```tsx
const navigate = useNavigate();
<button on:click={() => navigate('/users/2?tab=activity')}>用户 2</button>;
```

`navigate(-1)` 后退，`navigate(1)` 前进。新地址可以使用 `{ replace: true }` 替换当前记录。外部 URL 使用普通 `<a>`。

## Query 的边界

`useQuery()` 返回路由共享 VM；值经 URLSearchParams 解码，重复键取第一个，不存在的键为 undefined。直接赋值只改对象，不会更新地址，应该使用导航函数。
