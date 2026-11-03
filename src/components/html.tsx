import { onMount, ref, watch } from 'jinge';

import { href } from '../i18n';

/** HTML comes exclusively from our build-time Markdown and syntax highlighter. */
export function Html(props: { html: string; className?: string }) {
  const element = ref<HTMLDivElement>();
  const update = () => {
    if (!element.value) return;
    element.value.innerHTML = props.html;
    for (const link of element.value.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')) {
      link.setAttribute('href', href(link.getAttribute('href')!));
    }
  };
  onMount(update);
  watch(props, 'html', update);
  return <div ref={element} className={props.className ?? ''} />;
}
