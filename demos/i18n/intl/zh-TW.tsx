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
      點選<T_vAhGAz_a>{props.action}</T_vAhGAz_a>檢視詳情。
    </>
  );
}
export default {
  '1Ko2kn': '增加計數',
  '1VTdPd': '5. 事件與狀態',
  '2EZ/9H': '3. 屬性上的文本',
  '5LvxtS': (props: Record<string, unknown>) => `當前計數：${props.count}`,
  '5ZV1Ao': '請輸入你的名字',
  EnPQvP: '這裡',
  IDwbQb: '國際化示例',
  Jak65C: '4. 富文本',
  NZE2Cq: '2. 帶引數的文本',
  'OV/1Xs': '點選我',
  UtgWDL: (props: Record<string, unknown>) => `你好，${props.name}！`,
  YwiFye: '語言切換會立即更新模板中的文本，但不會重新執行元件函式。',
  'demo.explicit': (props: Record<string, unknown>) => `帶顯式 key 的文本：${props.value}`,
  fn24jI: '屬性上的 t() 會被編譯成 IntlWatcher，語言切換時屬性值也會更新。',
  gyqdfD: '這是一段普通的靜態文本。',
  mU5Vos: '1. 簡單文本',
  s4pPKB: '當前語言：',
  u5gMOi: '富文本的翻譯裡可以保留標籤，編譯時會從呼叫處的 JSX 中取出對應標籤的渲染函式。',
  udDuLT: '按鈕已點選',
  vAhGAz: T_vAhGAz,
  wAS0Ri: '下面這些文本都會在編譯時被替換成 6 位 key，並在執行時從字典中讀取。',
};
