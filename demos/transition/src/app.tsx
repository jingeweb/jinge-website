import './app.css';
import { KEY_DATA, Transition, TransitionGroup, vm } from 'jinge';

export function App() {
  const state = vm({
    show1: true,
    show2: true,
    items: [1, 2, 3, 4],
  });

  return (
    <>
      <h1>Transition/Animation Demo</h1>
      <p>简单地显示/隐藏切换。不销毁 DOM。</p>
      <div className="flex">
        <Transition
          isEnter={state.show1}
          enterActiveClass="active1"
          enterClass="show1"
          leaveClass="hide1"
        >
          <p>Hello, World!</p>
        </Transition>
        <button
          on:click={() => {
            state.show1 = !state.show1;
          }}
        >
          {state.show1 ? 'Hide' : 'Show'}
        </button>
      </div>
      <p>初始（appear）渲染时就展示动态。</p>
      <div className="flex">
        <Transition
          appear
          isEnter={state.show1}
          enterActiveClass="active2"
          enterClass="show1"
          leaveClass="hide1"
        >
          <p>Hello, World!</p>
        </Transition>
        <button
          on:click={() => {
            state.show1 = !state.show1;
          }}
        >
          {state.show1 ? 'Hide' : 'Show'}
        </button>
      </div>
      <p>显示/隐藏切换时使用不同的动态效果(隐藏时更快），隐藏后销毁 DOM。</p>
      <div className="flex">
        <Transition
          isEnter={state.show2}
          enterActiveClass="enter-active2"
          leaveActiveClass="leave-active2"
          enterClass="enter2"
          leaveClass="leave2"
          destroyAfterLeave
        >
          <p>Hello, World!</p>
        </Transition>
        <button
          on:click={() => {
            state.show2 = !state.show2;
          }}
        >
          {state.show2 ? 'Hide' : 'Show'}
        </button>
      </div>
      <p>循环列表动态（Transition-Group）示例</p>
      <div className="flex">
        <TransitionGroup
          enterClass="enter2"
          leaveClass="leave2"
          enterActiveClass="enter-active2"
          loop={state.items}
          key={KEY_DATA}
        >
          {(each) => (
            <div className="flex">
              <div>{each.data}</div>
              <button
                on:click={() => {
                  state.items.splice(each.index, 1);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </TransitionGroup>
      </div>
      <div>
        <button
          on:click={() => {
            state.items.push(Math.floor(Math.random() * 0xffff));
          }}
        >
          Add Item
        </button>
      </div>
    </>
  );
}
