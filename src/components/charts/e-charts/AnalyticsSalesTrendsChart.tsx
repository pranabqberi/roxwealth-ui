import { CSSProperties } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { getPastDates, rgbaColor } from 'helpers/utils';
import { useAppContext } from 'providers/AppProvider';
import { TooltipComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import dayjs from 'dayjs';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { tooltipFormatterDefault } from 'helpers/echart-utils';

echarts.use([TooltipComponent, BarChart, LineChart]);

const dates = getPastDates(7);

const data1 = [2000, 5700, 3700, 5500, 8000, 4000, 5500];
const data2 = [10500, 9000, 7000, 9000, 10400, 7500, 9300];

const getDefaultOptions = (
  getThemeColor: (name: string) => string,
  theme: string
) => ({
  color: [getThemeColor('primary-200'), getThemeColor('info-300')],
  tooltip: {
    trigger: 'axis',
    padding: [7, 10],
    backgroundColor: getThemeColor('gray-100'),
    borderColor: getThemeColor('gray-300'),
    textStyle: { color: getThemeColor('dark') },
    borderWidth: 1,
    transitionDuration: 0,
    axisPointer: {
      type: 'none'
    },
    formatter: (params: CallbackDataParams[]) =>
      tooltipFormatterDefault(params, 'MMM DD, YYYY', 'color')
  },
  xAxis: {
    type: 'category',
    data: dates,
    axisLabel: {
      color: getThemeColor('gray-900'),
      formatter: (value: number) => dayjs(value).format('ddd'),
      fontFamily: 'Nunito Sans',
      fontWeight: 400,
      fontSize: 12.8,
      margin: 16
    },
    axisLine: {
      lineStyle: {
        color: getThemeColor('gray-200')
      }
    },
    axisTick: false
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: getThemeColor('gray-200')
      }
    },
    axisLabel: {
      color: getThemeColor('gray-900'),
      fontFamily: 'Nunito Sans',
      fontWeight: 700,
      fontSize: 12.8,
      margin: 24,
      formatter: (value: number) => `${value / 1000}k`
    }
    // interval: 1000,
  },
  series: [
    {
      name: 'Revenue',
      type: 'bar',
      barWidth: '16px',
      label: {
        show: false
      },
      itemStyle: {
        color:
          theme === 'light'
            ? getThemeColor('primary-200')
            : getThemeColor('primary'),

        borderRadius: [4, 4, 0, 0]
      },
      data: data2
    },
    {
      name: 'Profit',
      type: 'line',
      symbol: 'circle',
      symbolSize: 11,
      itemStyle: {
        color: getThemeColor('info-300'),
        borderColor:
          theme === 'light' ? getThemeColor('white') : getThemeColor('dark'),
        borderWidth: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: rgbaColor(getThemeColor('info-300'), 0.2)
            },
            {
              offset: 1,
              color: rgbaColor(getThemeColor('info-300'), 0.2)
            }
          ]
        }
      },
      data: data1
    }
  ],
  grid: {
    right: '0',
    left: '0',
    bottom: 0,
    top: 10,
    containLabel: true
  },
  animation: false
});

const AnalyticsSalesTrendsChart = ({ style }: { style: CSSProperties }) => {
  const {
    getThemeColor,
    config: { theme }
  } = useAppContext();
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={getDefaultOptions(getThemeColor, theme)}
      style={style}
    />
  );
};

export default AnalyticsSalesTrendsChart;
