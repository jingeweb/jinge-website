/**
 * Material Symbols, compiled at build time by `@iconify/tailwind4` from the local
 * `@iconify-json/material-symbols` data — no icon font, no CDN request at runtime.
 *
 * The class names are written out literally so Tailwind can see them while scanning.
 */
const icons = {
  'arrow-back': 'icon-[material-symbols--arrow-back]',
  'arrow-downward': 'icon-[material-symbols--arrow-downward]',
  'arrow-forward': 'icon-[material-symbols--arrow-forward]',
  'arrow-outward': 'icon-[material-symbols--arrow-outward]',
  'auto-awesome': 'icon-[material-symbols--auto-awesome]',
  bolt: 'icon-[material-symbols--bolt]',
  check: 'icon-[material-symbols--check]',
  close: 'icon-[material-symbols--close]',
  code: 'icon-[material-symbols--code]',
  'dark-mode': 'icon-[material-symbols--dark-mode]',
  'data-object': 'icon-[material-symbols--data-object]',
  'keyboard-arrow-down': 'icon-[material-symbols--keyboard-arrow-down]',
  'keyboard-arrow-up': 'icon-[material-symbols--keyboard-arrow-up]',
  'light-mode': 'icon-[material-symbols--light-mode]',
  menu: 'icon-[material-symbols--menu]',
  'open-in-new': 'icon-[material-symbols--open-in-new]',
  search: 'icon-[material-symbols--search]',
};

export type IconName = keyof typeof icons;

export function Icon(props: { name: IconName; className?: string }) {
  return (
    <span
      className={`${icons[props.name]} inline-block shrink-0 align-[-0.125em] leading-[1] ${props.className ?? ''}`}
      aria-hidden="true"
    />
  );
}
