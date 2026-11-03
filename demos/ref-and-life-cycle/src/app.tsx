import { onMount, ref, vm } from 'jinge';

import { Boy } from './boy';

export function App() {
  const state = vm({ name: 'Bob', show: true, count: 0 });

  const el = ref<HTMLParagraphElement>(); // 获取 html 元素的 ref
  const boy = ref<typeof Boy>(); // 获取 FC(函数组件) 的 ref，函数组件必须有定义 expose 属性。

  onMount(() => {
    console.info(el.value);
    console.info(boy.value?.someApi());
  });
  const toggleShow = () => {
    state.count++;
    state.show = !state.show;
  };

  return (
    <>
      <h2>Lifecycle demo</h2>
      <p ref={el}>
        Each component have two lifecycle hooks, onMount and onUnmount. Open Dev-Tools to see log.
      </p>
      <p>{state.show && <Boy ref={boy} name={`${state.name}_${state.count}`} />}</p>
      <p>
        <button on:click={() => toggleShow()}>{state.show ? 'Hide' : 'Show'} Boy</button>
        {state.show && (
          <button
            on:click={() => {
              console.info(boy.value?.someApi());
            }}
          >
            Call Api
          </button>
        )}
      </p>
    </>
  );
}
