import { vm, watch } from 'jinge';
import { useParams } from 'jinge-router';

import { TodoStore, addTodo, toggleAllDone, updateStatus } from '../services/store';
import { Footer } from './Footer';
import { TodoItem } from './Item';

export function TodoList() {
  const state = vm({
    newTodo: '',
  });
  const params = useParams<{ status?: string }>();
  updateStatus(params.status);
  watch(params, 'status', (v) => updateStatus(v));

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={state.newTodo}
          on:change={(evt) => (state.newTodo = evt.target.value)}
          autoFocus
          on:keyUp={(evt) => {
            if (evt.key === 'Enter') {
              const title = state.newTodo.trim();
              if (title) {
                addTodo(title);
                state.newTodo = '';
              }
            }
          }}
        />
      </header>
      {TodoStore.todos.length > 0 && (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={TodoStore.remaining === 0 && TodoStore.all.length > 0}
            on:click={() => {
              toggleAllDone();
            }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {TodoStore.todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      )}
      <Footer />
    </section>
  );
}
