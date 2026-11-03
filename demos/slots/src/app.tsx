import { vm } from 'jinge';

import { Card } from './components/card';
import { Field } from './components/field';
import { Panel } from './components/panel';

export function App() {
  const state = vm({
    name: 'jinge',
  });

  return (
    <>
      <h1>插槽 Slots</h1>
      <p className="hint">
        {
          'jinge 的插槽在编译后就是组件 props 上的函数（slot:default / slot:名称），由组件决定把函数渲染到哪个位置。'
        }
      </p>

      <h2>1. 默认插槽与兜底</h2>
      <Card title="有默认插槽">
        <p>{'这段内容会渲染到 Card 的 props.children 位置。'}</p>
      </Card>
      <Card title="没有默认插槽" />

      <h2>2. 命名插槽</h2>
      <Card title="命名插槽" slot:footer={<span>{'通过 slot:footer 传入的页脚。'}</span>}>
        <p>{'命名插槽用 slot:名称={...} 属性传入，而不是写在子元素里。'}</p>
      </Card>

      <h2>3. 作用域插槽</h2>
      <Field label="昵称">
        {(ctx) => <input className="input" id={ctx.id} placeholder={ctx.placeholder} />}
      </Field>
      <p className="hint">
        {
          '插槽函数可以接收组件传入的参数。参数是普通对象时只渲染一次；如果参数里包含可变数据，编译器会为它建立绑定。'
        }
      </p>

      <h2>4. 插槽透传</h2>
      <Panel title="透传">
        <em>{'这段内容来自 App，经 Panel 透传到 Card 的 footer 插槽。'}</em>
      </Panel>

      <h2>5. 插槽内容里的数据绑定</h2>
      <Card title="插槽是函数，内容是响应式的">
        <p>
          {'插槽里的数据仍然响应式更新：'}
          <strong>{state.name}</strong>
        </p>
        <input
          className="input"
          value={state.name}
          on:input={(evt) => (state.name = evt.target.value)}
        />
      </Card>
      <p className="hint">
        {
          '插槽函数只在宿主组件渲染时被调用一次，但函数内部创建的 watcher 会持续跟随数据变化。需要切换“渲染哪段结构”时，请使用 If / Dynamic 等组件，而不是条件性地传不同的插槽函数。'
        }
      </p>
    </>
  );
}
