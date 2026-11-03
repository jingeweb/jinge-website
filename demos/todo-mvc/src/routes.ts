import { createRouter } from 'jinge-router';

import { TodoList } from './components/List';

export const router = createRouter({
  mode: 'hash',
  routes: [
    { path: '/', redirectTo: '/all' },
    {
      path: '/:status',
      component: TodoList,
    },
  ],
});
