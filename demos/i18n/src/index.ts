import { bootstrap, intlInit } from 'jinge';

import zh from '../intl/zh';
import { App } from './app';
import './style.css';

await intlInit({
  defaultLocale: 'zh',
  dicts: { zh },
  // en 字典按需加载：首次切换到英文时才会发起 import。
  dictLoader: async (locale) => {
    if (locale === 'en') {
      const mod = await import('../intl/en');
      return mod.default;
    }
    throw new Error(`unsupported locale: ${locale}`);
  },
});

bootstrap(App, document.getElementById('app')!);
