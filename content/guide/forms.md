---
title: 表单与事件
description: 让输入、校验和状态之间的关系清晰可见。
group: 基础
---

## 受控输入

```tsx
const state = vm({ name: '', accepted: false });

<input
  value={state.name}
  on:input={(event) => state.name = event.target.value}
/>
<input
  type="checkbox"
  checked={state.accepted}
  on:change={(event) => state.accepted = event.target.checked}
/>
```

模板负责从状态显示值，事件负责写回数据。数字输入可以通过 `Number()` 显式转换；校验规则由应用决定。

## 提交表单

```tsx
<form
  on:submit={(event) => {
    event.preventDefault();
    save(state.name);
  }}
>
  <label htmlFor="name">名称</label>
  <input id="name" value={state.name} on:input={(event) => (state.name = event.target.value)} />
  <button type="submit">保存</button>
</form>
```

原生表单元素保持正常的标签关联与键盘操作。事件参数类型由对应元素提供。

## 更多控件

查看[表单输入](/examples/form-input/)了解 textarea、select 与多选；查看[表单组合](/examples/form/)了解完整数据汇总。
