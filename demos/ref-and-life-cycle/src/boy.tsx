import { expose, onMount, onUnmount, type WithExpose } from 'jinge';

export function Boy(
  props: { name: string } & WithExpose<{
    someApi(): string;
  }>,
) {
  expose<typeof Boy>({
    someApi: () => {
      alert(`Hello, everyone. My name is ${props.name}`);
      return 'hello from expose api';
    },
  });
  onMount(() => {
    console.info('after mounted');
    return () => {
      console.info('before unmount 1');
    };
  });
  onUnmount(() => {
    console.info('before unmount 2');
  });
  return <span>Hello, Everyone! My name is {props.name}!</span>;
}
