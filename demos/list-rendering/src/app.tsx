import { For, KEY_DATA, nextTick, ref, vm } from 'jinge';

interface Item {
  id: number;
  name: string;
  tag: string;
}

interface Group {
  name: string;
  children: { id: number; name: string }[];
}

let seq = 100;

function Row(props: { item: Item; index: number; onRemove: (id: number) => void }) {
  return (
    <li className="row">
      <span className="idx">{props.index}</span>
      <span className="name">{props.item.name}</span>
      <span className="tag">{props.item.tag}</span>
      <input className="note" placeholder={'在这里输入点内容，再重排观察 DOM 是否跟随'} />
      <button className="btn tiny" on:click={() => props.onRemove(props.item.id)}>
        {'删除'}
      </button>
    </li>
  );
}

export function App() {
  const state = vm({
    useKey: true,
    log: '',
    items: [
      { id: 1, name: '苹果', tag: 'fruit' },
      { id: 2, name: '香蕉', tag: 'fruit' },
      { id: 3, name: '胡萝卜', tag: 'vegetable' },
      { id: 4, name: '土豆', tag: 'vegetable' },
    ] as Item[],
    groups: [
      {
        name: '水果',
        children: [
          { id: 1, name: '苹果' },
          { id: 2, name: '香蕉' },
        ],
      },
      {
        name: '蔬菜',
        children: [
          { id: 3, name: '胡萝卜' },
          { id: 4, name: '土豆' },
        ],
      },
    ] as Group[],
    tags: ['jinge', 'mvvm', 'proxy'] as string[],
  });

  const listEl = ref<HTMLUListElement>();

  function shuffle() {
    state.items.sort(() => Math.random() - 0.5);
  }
  function reverse() {
    state.items.reverse();
  }
  function sortByName() {
    state.items.sort((a, b) => a.name.localeCompare(b.name));
  }
  function add() {
    seq += 1;
    state.items.push({ id: seq, name: `条目 ${seq}`, tag: 'new' });
  }
  function remove(id: number) {
    const index = state.items.findIndex((item) => item.id === id);
    if (index >= 0) state.items.splice(index, 1);
  }

  async function addAndMeasure() {
    const el = listEl.value;
    const before = el?.children.length ?? 0;
    add();
    const immediate = el?.children.length ?? 0;
    await nextTick();
    const after = el?.children.length ?? 0;
    state.log = `push 前 ${before} 个 <li>，push 后立即读取 ${immediate} 个，await nextTick() 后 ${after} 个。`;
    if (el) el.scrollTo({ top: el.scrollHeight });
  }

  return (
    <>
      <h1>列表渲染</h1>
      <p className="hint">
        {
          '模板里的 .map() 会被编译成 <For> 组件。key 取自 map 回调返回的第一个根元素；没有 key 时按索引原地复用。'
        }
      </p>

      <div className="toolbar">
        <button className="btn" on:click={() => (state.useKey = !state.useKey)}>
          {state.useKey ? '当前：keyed' : '当前：unkeyed'}
        </button>
        <button className="btn" on:click={shuffle}>
          {'随机排序'}
        </button>
        <button className="btn" on:click={reverse}>
          {'反转'}
        </button>
        <button className="btn" on:click={sortByName}>
          {'按名称排序'}
        </button>
        <button className="btn" on:click={addAndMeasure}>
          {'添加并测量'}
        </button>
      </div>

      <p className="hint">
        {
          '在行的输入框里输入内容，然后点“随机排序 / 反转”：keyed 模式下输入内容会跟着数据行移动；unkeyed 模式下输入内容会留在原来的位置。'
        }
      </p>
      <p className="measure">{state.log || '点击“添加并测量”，观察 DOM 更新的时机。'}</p>

      <ul className="list" ref={listEl}>
        {state.useKey ? (
          <For loop={state.items} key="id">
            {(each) => <Row item={each.data} index={each.index} onRemove={remove} />}
          </For>
        ) : (
          <For loop={state.items}>
            {(each) => <Row item={each.data} index={each.index} onRemove={remove} />}
          </For>
        )}
      </ul>
      {state.items.length === 0 && <p className="empty">{'列表为空'}</p>}

      <h2>嵌套列表</h2>
      <div className="groups">
        <For loop={state.groups} key="name">
          {(group) => (
            <div className="group">
              <h4>{group.data.name}</h4>
              <ul className="sublist">
                <For loop={group.data.children} key="id">
                  {(child) => (
                    <li>
                      <span className="idx">{child.index}</span>
                      {child.data.name}
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      </div>

      <h2>基础类型数组</h2>
      <ul className="tags">
        <For loop={state.tags} key={KEY_DATA}>
          {(each) => <li className="tag-item">{each.data}</li>}
        </For>
      </ul>
      <p className="hint">
        {
          '基础类型数组用 KEY_DATA 以元素本身作为 key；也可以用 KEY_INDEX 以索引作为 key（不推荐，重排时会失去复用）。'
        }
      </p>
    </>
  );
}
