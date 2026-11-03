import { bootstrap, onMount, onUnmount, vm } from 'jinge';
import {
  Router,
  RouterHref,
  RouterView,
  createRouter,
  useNavigate,
  useParams,
  useQuery,
} from 'jinge-router';

import './style.css';

function Welcome() {
  return (
    <section>
      <p className="label">OVERVIEW</p>
      <h2>页面，从这里连接。</h2>
      <p>点击用户链接，观察路径参数与 query 的变化。</p>
    </section>
  );
}
function User() {
  const params = useParams<{ id: number }>();
  const query = useQuery();
  return (
    <section>
      <p className="label">USER DETAIL</p>
      <h2>用户 {params.id}</h2>
      <p>
        当前标签：<strong>{query.tab ?? 'overview'}</strong>
      </p>
      <p>这是响应式参数。切换用户时，页面组件会被复用。</p>
    </section>
  );
}
function Workspace() {
  return (
    <section className="workspace">
      <p className="label">共享的父布局</p>
      <h2>项目空间</h2>
      <nav>
        <RouterHref to="/workspace">概览</RouterHref>
        <RouterHref to="/workspace/settings">设置</RouterHref>
      </nav>
      <RouterView />
    </section>
  );
}
function WorkspaceHome() {
  return <p>这里是嵌套布局的默认子页面。</p>;
}
function Settings() {
  return <p>这里是设置页面。上方的项目布局保留。</p>;
}
function Missing() {
  return <h2>没有匹配的页面</h2>;
}
const router = createRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Welcome },
    { path: '/users/:id<num>', component: User },
    {
      path: '/workspace',
      component: Workspace,
      children: [{ component: WorkspaceHome }, { path: 'settings', component: Settings }],
    },
    { path: '/*', component: Missing },
  ],
});
function Demo() {
  const navigate = useNavigate();
  const state = vm({ url: location.hash.slice(1) || '/' });
  const sync = () => {
    state.url = location.hash.slice(1) || '/';
  };
  onMount(() => {
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
  });
  onUnmount(() => {
    window.removeEventListener('hashchange', sync);
    window.removeEventListener('popstate', sync);
  });
  return (
    <main>
      <div className="address">
        <button aria-label="后退" on:click={() => navigate(-1)}>
          ←
        </button>
        <button aria-label="前进" on:click={() => navigate(1)}>
          →
        </button>
        <code>jinge.app#{state.url}</code>
      </div>
      <div className="layout">
        <nav className="sidebar">
          <RouterHref to="/" exactActiveClass="selected">
            首页
          </RouterHref>
          <RouterHref to="/users/1" activeClass="selected">
            用户 1
          </RouterHref>
          <RouterHref to="/users/2" activeClass="selected">
            用户 2
          </RouterHref>
          <button on:click={() => navigate('/users/2?tab=activity')}>用户 2 · activity</button>
          <RouterHref to="/workspace" activeClass="selected">
            嵌套布局
          </RouterHref>
        </nav>
        <RouterView />
      </div>
    </main>
  );
}
function App() {
  return (
    <Router router={router}>
      <Demo />
    </Router>
  );
}
bootstrap(App, document.getElementById('app')!);
