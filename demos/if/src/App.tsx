import { If, vm } from 'jinge';

export function App() {
  const state = vm({ show: true });
  return (
    <>
      <h1>If 条件判定和渲染</h1>
      <p>
        jinge 框架中，一切都是组件，也只有组件、属性和插槽的概念。
        <br />
        根据条件语句进行不同的渲染，也是由 <code>If</code> 组件支撑。例如：
      </p>
      <div>
        <If expect={state.show}>
          <div>我显示出来啦！</div>
        </If>
        <button on:click={() => (state.show = !state.show)}>
          <If expect={state.show} slot:else={'显示'}>
            隐藏
          </If>
        </button>
      </div>
      <p>上面例子代码是：</p>
      <pre>
        <code>
          {` <If expect={state.show}>
  <div>我显示出来啦！</div>
</If>
<button on:click={() => (state.show = !state.show)}>
  <If expect={state.show} slot:else={'显示'}>
    隐藏
  </If>
</button>`}
        </code>
      </pre>
      <p>
        为了书写上更方便，也为了兼容 React 的 tsx 的写法，jinge 编译器可以把 <code>? :</code>
        表达式自动转成使用 If 组件的写法。例如上述例子可以写成：
      </p>
      <pre>
        <code>
          {`{state.show ? <div>出来啦！</div> : <div>不见啦!</div>}
<button on:click={() => (state.show = !state.show)}>{state.show ? '隐藏' : '显式'}</button>`}
        </code>
      </pre>
      <p>上述代码的效果如下：</p>
      <div>
        {state.show ? <div>出来啦！</div> : <div>不见啦!</div>}
        <button on:click={() => (state.show = !state.show)}>{state.show ? '隐藏' : '显式'}</button>
      </div>
    </>
  );
}
