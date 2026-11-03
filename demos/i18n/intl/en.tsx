import type { JNode } from 'jinge';
function T_vAhGAz_a(props: { children: JNode }) {
  return (
    <a className="link" href="#details">
      {props.children}
    </a>
  );
}
function T_vAhGAz(props: Record<string, JNode>) {
  return (
    <>
      Click <T_vAhGAz_a>{props.action}</T_vAhGAz_a> for details.
    </>
  );
}
export default {
  '1Ko2kn': 'Increase',
  '1VTdPd': '5. Events and state',
  '2EZ/9H': '3. Text in attributes',
  '5LvxtS': (props: Record<string, unknown>) => `Current count: ${props.count}`,
  '5ZV1Ao': 'Please input your name',
  EnPQvP: 'here',
  IDwbQb: 'i18n Demo',
  Jak65C: '4. Rich text',
  NZE2Cq: '2. Text with params',
  'OV/1Xs': 'Click me',
  UtgWDL: (props: Record<string, unknown>) => `Hello, ${props.name}!`,
  YwiFye:
    'Switching locale updates texts in the template immediately, without re-running the component function.',
  'demo.explicit': (props: Record<string, unknown>) => `Text with an explicit key: ${props.value}`,
  fn24jI: 't() in attributes compiles to IntlWatcher, so attribute values update on locale change.',
  gyqdfD: 'This is a piece of plain static text.',
  mU5Vos: '1. Plain text',
  s4pPKB: 'Current locale:',
  u5gMOi:
    'Rich-text translations can keep tags; the compiler extracts the tag renderers from the JSX at the call site.',
  udDuLT: 'Button clicked',
  vAhGAz: T_vAhGAz,
  wAS0Ri:
    'These texts are replaced with 6-character keys at compile time and read from dictionaries at runtime.',
};
