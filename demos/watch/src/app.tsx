import { onUnmount, vm, vmWatch, watch } from 'jinge';

export function App() {
  const boy1 = vm({
    name: 'ge',
    children: [
      {
        name: 'yuang',
      },
    ],
  });
  const state = vm<{
    n: number;
    boy2: {
      name: string;
      children?: { name: string }[];
    };
  }>({
    n: 10,
    boy2: {
      name: 'yy',
      children: [
        {
          name: 'pp',
        },
      ],
    },
  });

  // 监听 vm 的某个属性。
  watch(state, 'n', (v) => {
    console.info('state.n changed to: ', v);
  });
  // 监听 vm 的深层嵌套子属性
  watch(boy1, ['children', 0, 'name'], (newV) => {
    console.info('boy1.children[0].name changed to:', newV);
  });

  // 深度监听 vm，回调的第三个参数是发生变更的属性（路径）.
  watch(boy1, (newV, oldV, propPath) => {
    console.info('boy1 deep notify.', newV === oldV, propPath);
  });

  // vmWatch 是更底层的监听函数，返回取消监听的 unwatch 函数，可用于手动控制监听和取消监听。
  // vmWatch 是和组件无关的纯 View-Model 的监听函数，可用在任何代码上下文中。
  const unwatch = vmWatch(
    state,
    ['boy2', 'children'],
    (newV, oldV, propPath) => {
      console.info('boy2 children changed', propPath, newV);
    },
    { deep: true },
  );

  onUnmount(unwatch); // 手动添加到 onUnmount 生命周期。

  // watch 仅用于在组件中监听 View-Model，会自动在组件卸载时取消监听。
  watch(state, ['boy2', 'name'], (newV) => {
    console.info('boy2.name changed to:', newV);
  });

  function test1() {
    boy1.children[0].name = 'cc';
  }
  function test2() {
    /**
     * jinge 框架里对 ViewModel 的 watch，不是基于值变化的，而是基于赋值路径。
     * 比如 'boy2' 这个路径发生了赋值行为，那么一定会通知该路径及其子路径上的监听。
     * 无论路径对应的实际值是否发生变化。
     */
    state.boy2 = {
      name: 'ge',
    };
  }

  function test3() {
    state.n++;
    boy1.children.push(
      vm({
        name: 'ppp',
      }),
    );
  }

  return (
    <>
      <h3>ViewModel watch</h3>
      <p>Please see code and console output.</p>
      <button on:click={() => test1()}>Test1</button>
      <button on:click={() => test2()}>Test2</button>
      <button on:click={() => test3()}>Test3</button>
    </>
  );
}
