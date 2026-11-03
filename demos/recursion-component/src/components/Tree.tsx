import { isArray, vm, watch } from 'jinge';

import { TreeNode } from './TreeNode';

export interface TreeData {
  name: string;
  children?: TreeData[];
}

export function Tree(props: { data: TreeData | TreeData[] }) {
  const state = vm({ nodes: [] as TreeData[] });
  watch(
    props,
    'data',
    (v) => {
      state.nodes = isArray(v) ? v : [v];
    },
    { immediate: true },
  );

  return (
    <>
      {state.nodes.map((node) => (
        <TreeNode key={node.name} node={node} />
      ))}
    </>
  );
}
