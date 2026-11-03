import { RouterHref } from 'jinge-router';

import { TodoStore, removeDone } from '../services/store';

export function Footer() {
  return (
    <>
      {TodoStore.all.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            <strong>{TodoStore.remaining}</strong>
            {TodoStore.remaining === 1 ? ' item' : ' items'}
            left
          </span>
          <ul className="filters">
            <li>
              <RouterHref to="/all" activeClass="selected">
                All
              </RouterHref>
            </li>
            <li>
              <RouterHref to="/active" activeClass="selected">
                Active
              </RouterHref>
            </li>
            <li>
              <RouterHref to="/completed" activeClass="selected">
                Completed
              </RouterHref>
            </li>
          </ul>
          {TodoStore.remaining < TodoStore.all.length && (
            <button
              className="clear-completed"
              on:click={() => {
                removeDone();
              }}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
}
