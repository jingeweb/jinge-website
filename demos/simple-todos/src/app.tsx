import { vm, watch } from 'jinge';

const LS_KEY = 'JINGE_SAVED_SIMPLE_TODOS';

interface Todo {
  title: string;
  done: boolean;
}

function loadTodos() {
  let data = localStorage.getItem(LS_KEY);
  if (!data) return null;
  try {
    data = JSON.parse(data);
    return Array.isArray(data) ? (data as Todo[]) : null;
  } catch {
    return null;
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(todos));
}

function createTodo(title: string, done = false) {
  return vm<Todo>({
    title,
    done,
  });
}

export function App() {
  const state = (() => {
    const todos = vm(loadTodos() ?? [createTodo('test')]);

    return vm({
      todos,
      allDone: todos.length > 0 && !todos.find((t) => !t.done),
    });
  })();

  watch(state.todos, (todos) => {
    state.allDone = todos.length > 0 && !todos.find((t) => !t.done);
    saveTodos(todos);
  });
  const toggleAllDone = () => {
    state.todos.forEach((t) => (t.done = !state.allDone));
  };
  function toggleDone(todo: Todo) {
    todo.done = !todo.done;
  }

  function remove(todo: Todo) {
    const idx = state.todos.indexOf(todo);
    if (idx >= 0) state.todos.splice(idx, 1);
  }

  function modify(todo: Todo) {
    const oldTitle = todo.title;
    let title = prompt('Please enter title', oldTitle);
    if (!title || !(title = title.trim())) {
      return;
    }
    todo.title = title;
  }

  function add() {
    const title = prompt('Please enter title of new todo')?.trim();
    if (!title) {
      return;
    }
    if (state.todos.some((t) => t.title === title)) {
      alert('duplicated');
      return;
    }
    state.todos.push(createTodo(title));
  }

  function clear() {
    if (state.todos.length === 0) return;
    if (confirm('Sure to clear all todos?')) {
      state.todos.length = 0;
    }
  }
  return (
    <>
      <h2>Simple Todos</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  disabled={state.todos.length === 0}
                  type="checkbox"
                  checked={state.allDone}
                  on:click={() => toggleAllDone()}
                />
              </th>
              <th>Title</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {state.todos.map((todo) => (
              <tr key={todo.title}>
                <td>
                  <input type="checkbox" checked={todo.done} on:click={() => toggleDone(todo)} />
                </td>
                <td>{todo.title}</td>
                <td>
                  <button on:click={() => modify(todo)}>Modify</button>
                  <button on:click={() => remove(todo)}>Delete</button>
                </td>
              </tr>
            ))}

            {state.todos.length === 0 && (
              <tr>
                <td className="emp" colSpan={3}>
                  no todo, please add.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="ctrl">
        <button on:click={() => add()}>Add</button>
        <button on:click={() => clear()}>Clear</button>
      </div>
    </>
  );
}
