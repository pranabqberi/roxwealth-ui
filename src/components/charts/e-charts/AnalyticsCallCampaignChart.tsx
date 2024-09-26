import { useEffect, useRef, CSSProperties } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { getPastDates, rgbaColor } from 'helpers/utils';
import { useAppContext } from 'providers/AppProvider';
import { TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { tooltipFormatterDefault } from 'helpers/echart-utils';
import dayjs from 'dayjs';
import EChartsReactCore from 'echarts-for-react/lib/core';

echarts.use([TooltipComponent, LineChart]);

const dates = getPastDates(7);

const data1 = [8000, 7700, 5900, 10100, 5100, 6000, 4300];

const getDefaultOptions = (getThemeColor: (name: string) => string) => ({
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
  xAxis: [
    {
      type: 'category',
      data: dates,
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: getThemeColor('gray-200')
        }
      },
      axisLabel: {
        color: getThemeColor('gray-900'),
        // interval: 1,
        showMaxLabel: false,
        showMinLabel: true,
        align: 'left',
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
    {
      type: 'category',
      data: dates,
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: getThemeColor('gray-200')
        }
      },
      axisLabel: {
        color: getThemeColor('gray-900'),
        interval: 130,
        showMaxLabel: true,
        showMinLabel: false,
        align: 'right',
        formatter: (value: number) => dayjs(value).format('ddd'),
        fontFamily: 'Nunito Sans',
        fontWeight: 400,
        fontSize: 12.8,
        margin: 16
      },
      position: 'bottom',
      axisLine: {
        lineStyle: {
          color: getThemeColor('gray-200')
        }
      },
      axisTick: false
    }
  ],
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: getThemeColor('gray-200')
      }
    },
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
      margin: 16,
      formatter: (value: number) => `${value / 1000}k`
    }
    // interval: 150,
  },
  series: [
    {
      name: 'Campaign',
      type: 'line',
      smooth: 0.4,
      symbolSize: 11,
      itemStyle: {
        color: getThemeColor('primary')
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
              color: rgbaColor(getThemeColor('primary-300'), 0.2)
            },
            {
              offset: 1,
              color: rgbaColor(getThemeColor('primary-300'), 0.2)
            }
          ]
        }
      },
      data: data1
    }
  ],
  grid: {
    right: '8',
    left: 6,
    bottom: '-10',
    top: 10,
    containLabel: true
  },
  animation: false
});

const AnalyticsCallCampaignChart = ({ style }: { style: CSSProperties }) => {
  const chartRef = useRef<null | EChartsReactCore>(null);
  const updateDimensions = () => {
    if (window.innerWidth < 576) {
      chartRef.current?.getEchartsInstance().setOption({
        xAxis: [
          {},
          {
            axisLabel: {
              showMaxLabel: false
            }
          }
        ]
      });
    } else if (window.innerWidth > 576) {
      chartRef.current?.getEchartsInstance().setOption({
        xAxis: [
          {},
          {
            axisLabel: {
              showMaxLabel: true
            }
          }
        ]
      });
    }
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  useEffect(() => {
    updateDimensions();
  }, [chartRef.current]);

  const { getThemeColor } = useAppContext();

  return (
    <ReactEChartsCore
      ref={chartRef}
      echarts={echarts}
      option={getDefaultOptions(getThemeColor)}
      style={style}
    />
  );
};

export default AnalyticsCallCampaignChart;
