import { isString, uid, vm } from 'jinge';

const STORAGE_KEY = 'jinge-todo-mvc-saved-todos';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

function load(): Todo[] {
  if (!window.localStorage) return [];
  const data = window.localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const todos = JSON.parse(data);
    return Array.isArray(todos) ? todos : [];
  } catch {
    return [];
  }
}

const allTodos = load();
let currentFilter = 'all';

export const TodoStore = vm({
  status: 'all',
  all: allTodos,
  todos: allTodos,
  remaining: allTodos.reduce((pv, it) => pv + (it.done ? 0 : 1), 0),
});

function save() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(TodoStore.all));
}
function applyFilter() {
  if (TodoStore.all.length === 0) {
    TodoStore.todos = TodoStore.all;
  } else if (currentFilter === 'all') {
    TodoStore.todos = TodoStore.all;
  } else {
    TodoStore.todos = TodoStore.all.filter((t) => t.done === (currentFilter === 'completed'));
  }
}
export function updateStatus(filter?: string) {
  if (currentFilter === filter) return;
  currentFilter = isString(filter) && filter ? filter : 'all';
  applyFilter();
}

export function removeDone() {
  TodoStore.all = TodoStore.all.filter((t) => !t.done);
  applyFilter();
  save();
}

export function toggleDone(todo: Todo) {
  todo.done = !todo.done;
  TodoStore.remaining += todo.done ? -1 : 1;
  applyFilter();
  save();
}
export function toggleAllDone() {
  if (TodoStore.all.length === 0) return;
  TodoStore.remaining = TodoStore.remaining > 0 ? 0 : TodoStore.all.length;
  TodoStore.all.forEach((t) => (t.done = TodoStore.remaining === 0));
  applyFilter();
  save();
}
export function addTodo(title: string) {
  TodoStore.all.push({ id: uid(), title, done: false });
  TodoStore.remaining++;
  applyFilter();
  save();
}

export function removeById(id: string) {
  const idx = TodoStore.all.findIndex((t) => t.id === id);
  if (idx < 0) return;
  const todo = TodoStore.all.splice(idx, 1)[0];
  if (!todo.done) {
    TodoStore.remaining--;
  }
  applyFilter();
  save();
}

export function updateTitle(todo: Todo, title: string) {
  todo.title = title;
  save();
}
