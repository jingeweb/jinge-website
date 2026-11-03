import type { JNode } from 'jinge';
function T_vAhGAz_a(props: { children: JNode }) {
  return (
    <a className="link" href="#details">
      {props.children}
    </a>
  );
}
function T_vAhGAz(props: Record<string, JNode>) {
  return (
    <>
      点击<T_vAhGAz_a>{props.action}</T_vAhGAz_a>查看详情。
    </>
  );
}
export default {
  '1Ko2kn': '增加计数',
  '1VTdPd': '5. 事件与状态',
  '2EZ/9H': '3. 属性上的文本',
  '5LvxtS': (props: Record<string, unknown>) => `当前计数：${props.count}`,
  '5ZV1Ao': '请输入你的名字',
  EnPQvP: '这里',
  IDwbQb: '国际化示例',
  Jak65C: '4. 富文本',
  NZE2Cq: '2. 带参数的文本',
  'OV/1Xs': '点击我',
  UtgWDL: (props: Record<string, unknown>) => `你好，${props.name}！`,
  YwiFye: '语言切换会立即更新模板中的文本，但不会重新执行组件函数。',
  'demo.explicit': (props: Record<string, unknown>) => `带显式 key 的文本：${props.value}`,
  fn24jI: '属性上的 t() 会被编译成 IntlWatcher，语言切换时属性值也会更新。',
  gyqdfD: '这是一段普通的静态文本。',
  mU5Vos: '1. 简单文本',
  s4pPKB: '当前语言：',
  u5gMOi: '富文本的翻译里可以保留标签，编译时会从调用处的 JSX 中取出对应标签的渲染函数。',
  udDuLT: '按钮已点击',
  vAhGAz: T_vAhGAz,
  wAS0Ri: '下面这些文本都会在编译时被替换成 6 位 key，并在运行时从字典中读取。',
};
