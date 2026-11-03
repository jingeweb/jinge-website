import { cx } from 'jinge';

import type { TreeData } from './Tree';
export function TreeNode(props: { node: TreeData; level?: number }) {
  return (
    <>
      <div
        style={`padding-left: ${(props.level ?? 0) * 20}px;`}
        className={cx(
          'tree-node',
          props.node.children && props.node.children.length > 0 ? 'parent' : 'leaf',
        )}
      >
        {props.node.name}
      </div>

      {props.node.children?.length &&
        props.node.children.map((cn) => (
          <TreeNode key={cn.name} node={cn} level={(props.level ?? 0) + 1} />
        ))}
    </>
  );
}
