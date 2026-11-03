---
title: 引數、Query 與導航
description: URL 改變時，複用頁面並更新資料。
group: 路由
---

## 讀取響應式引數

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

路由宣告 `/users/:id<num>` 時，id 在執行時轉換為數字。路徑引數包含祖先層級，重名時以子路由為準。

## 引數變化不會重建頁面

僅引數或 query 變化時，已匹配的元件會複用。模板繼續讀取 VM 屬性即可更新；資料載入等副作用要監聽屬性變化。

## 觸發導航

```tsx
const navigate = useNavigate();
<button on:click={() => navigate('/users/2?tab=activity')}>使用者 2</button>;
```

`navigate(-1)` 後退，`navigate(1)` 前進。新地址可以使用 `{ replace: true }` 替換當前記錄。外部 URL 使用普通 `<a>`。

## Query 的邊界

`useQuery()` 返回路由共享 VM；值經 URLSearchParams 解碼，重複鍵取第一個，不存在的鍵為 undefined。直接賦值只改物件，不會更新地址，應該使用導航函式。
