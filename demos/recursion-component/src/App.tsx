import { vm } from 'jinge';

import { Tree } from './components/Tree';

export function App() {
  const treeData = vm({
    name: 'root',
    children: [
      {
        name: 'c-1',
        children: [
          {
            name: 'c-1-1',
            children: [
              {
                name: 'c-1-1-1',
              },
            ],
          },
          {
            name: 'c-1-2',
          },
        ],
      },
      {
        name: 'c-2',
        children: [
          {
            name: 'c-2-1',
          },
        ],
      },
      {
        name: 'c-3',
      },
    ],
  });

  return (
    <>
      <Tree data={treeData} />
    </>
  );
}
