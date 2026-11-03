import { Router, RouterView } from 'jinge-router';

import { router } from '../routes';

export function App() {
  return (
    <>
      <Router router={router}>
        <RouterView />
      </Router>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="https://github.com/yuhangge">Yuhang Ge</a>
        </p>
      </footer>
    </>
  );
}
