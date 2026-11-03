import { cx, ref, vm } from 'jinge';

import { type Todo, removeById, toggleDone, updateTitle } from '../services/store';

export function TodoItem(props: { todo: Todo }) {
  const state = vm({ editing: false, editingTitle: '' });
  const stopEdit = () => {
    state.editing = false;
    const editingTitle = state.editingTitle.trim();
    if (editingTitle) {
      updateTitle(props.todo, editingTitle);
      state.editingTitle = '';
    }
  };
  const ipt = ref<HTMLInputElement>();

  return (
    <li className={cx(props.todo.done && 'completed', state.editing && 'editing')}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          on:click={() => {
            toggleDone(props.todo);
          }}
          checked={props.todo.done}
        />
        <label
          on:doubleClick={() => {
            state.editing = true;
            state.editingTitle = props.todo.title;
            setTimeout(() => {
              ipt.value?.select();
              ipt.value?.focus();
            });
          }}
        >
          {props.todo.title}
        </label>
        <button
          className="destroy"
          on:click={() => {
            removeById(props.todo.id);
          }}
        ></button>
      </div>
      {state.editing && (
        <input
          className="edit"
          ref={ipt}
          value={state.editingTitle}
          on:change={(evt) => (state.editingTitle = evt.target.value)}
          on:blur={() => {
            stopEdit();
          }}
          on:keyUp={(evt) => {
            if (evt.key === 'Enter') {
              stopEdit();
            } else if (evt.key === 'Esc') {
              state.editing = false;
              state.editingTitle = '';
            }
          }}
        />
      )}
    </li>
  );
}
