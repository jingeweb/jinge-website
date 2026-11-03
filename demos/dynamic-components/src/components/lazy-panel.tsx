export function LazyPanel(props: { title?: string }) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p className="desc">
        {'这个面板是异步加载的：lazy() + 动态 import，构建时会被拆成独立的 chunk。'}
      </p>
      <p className="ok">{'加载完成。'}</p>
    </div>
  );
}
