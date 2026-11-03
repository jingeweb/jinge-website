export function ProfilePanel(props: { title?: string }) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p className="desc">{'无状态面板。切换 tab 后，这里输入的内容会随着 DOM 一起销毁。'}</p>
      <input className="input" placeholder={'随便输入点什么'} />
    </div>
  );
}
