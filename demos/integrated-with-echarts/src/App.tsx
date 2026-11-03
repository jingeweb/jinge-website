import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { type ECharts, init as initEcharts, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { onMount, onUnmount, ref } from 'jinge';

use([BarChart, GridComponent, LegendComponent, TitleComponent, TooltipComponent, CanvasRenderer]);

export function App() {
  const chart = ref<HTMLDivElement>();
  let chartGraph: ECharts | undefined;
  onMount(() => {
    const observer = new ResizeObserver(() => chartGraph?.resize());
    if (chart.value) observer.observe(chart.value);
    return () => observer.disconnect();
  });
  onUnmount(() => chartGraph?.dispose());
  const renderEcharts = () => {
    if (!chart.value) return;
    if (!chartGraph) {
      chartGraph = initEcharts(chart.value);
    }
    // use configuration item and data specified to show chart
    chartGraph.setOption({
      title: {
        text: 'ECharts entry example',
      },
      grid: { left: 48, right: 24, top: 52, bottom: 55 },
      tooltip: {},
      legend: {
        data: ['Sales'],
      },
      xAxis: {
        data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks'],
      },
      yAxis: {},
      series: [
        {
          name: 'Sales',
          type: 'bar',
          data: Array.from({ length: 6 })
            .fill(0)
            .map(() => (Math.random() * 10) | (0 + 4)),
        },
      ],
    });
  };
  return (
    <>
      <h2>ECharts 集成</h2>
      <p>通过 Ref 挂载图表，组件销毁时释放实例。</p>
      <div style="width: min(100%, 500px); height: 300px;" ref={chart}></div>
      <p>
        <button
          on:click={() => {
            renderEcharts();
          }}
        >
          Render Chart
        </button>
      </p>
    </>
  );
}
