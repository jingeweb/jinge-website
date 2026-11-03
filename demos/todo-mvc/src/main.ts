import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';
import { bootstrap } from 'jinge';

import { App } from './components/App';

bootstrap(App, document.getElementById('app')!);
