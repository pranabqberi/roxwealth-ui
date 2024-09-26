import { CSSProperties, useEffect, useRef } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { rgbaColor } from 'helpers/utils';
import { useAppContext } from 'providers/AppProvider';
import { TooltipComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import EChartsReactCore from 'echarts-for-react/lib/core';

echarts.use([TooltipComponent, RadarChart]);

const getDefaultOptions = (
  getThemeColor: (name: string) => string,
  theme: string
) => ({
  color: [getThemeColor('primary-300'), getThemeColor('warning-300')],
  tooltip: {
    trigger: 'item',
    padding: [7, 10],
    backgroundColor: getThemeColor('gray-100'),
    borderColor: getThemeColor('gray-300'),
    textStyle: {
      color: getThemeColor('gray-900'),
      fontSize: 12.8,
      fontFamily: 'Nunito Sans'
    },
    borderWidth: 1,
    transitionDuration: 0
  },
  radar: {
    splitNumber: 5,
    axisNameGap: 10,
    radius: '87%',
    splitLine: {
      lineStyle: {
        color: getThemeColor('gray-200')
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        shadowBlur: 0.5,
        color: [
          theme == 'light'
            ? getThemeColor('gray-100')
            : getThemeColor('gray-100'),
          theme == 'light'
            ? getThemeColor('gray-soft')
            : getThemeColor('gray-200')
        ]
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: getThemeColor('gray-200')
      }
    },
    axisName: {
      color: getThemeColor('gray-700'),
      fontWeight: 800,
      fontSize: 10.2
    },
    indicator: [
      { name: 'SAT', max: 5000 },
      { name: 'FRI', max: 5000 },
      { name: 'THU', max: 5000 },
      { name: 'WED', max: 5000 },
      { name: 'TUE', max: 5000 },
      { name: 'MON', max: 5000 },
      { name: 'SUN', max: 5000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      symbol: 'emptyCircle',
      symbolSize: 6,

      data: [
        {
          value: [2100, 2300, 1600, 3700, 3000, 2500, 2500],
          name: 'Offline Marketing',
          itemStyle: {
            color: getThemeColor('primary-300')
          },
          areaStyle: {
            color: rgbaColor(getThemeColor('primary-300'), 0.3)
          }
        },
        {
          value: [3000, 1600, 3700, 500, 3700, 3000, 3200],
          name: 'Online Marketing',
          areaStyle: {
            color: rgbaColor(getThemeColor('warning-300'), 0.3)
          },
          itemStyle: {
            color: getThemeColor('warning-300')
          }
        }
      ]
    }
  ],
  grid: {
    top: 10,
    left: 0
  }
});

const MarketingCampaignChart = ({ style }: { style: CSSProperties }) => {
  const chartRef = useRef<null | EChartsReactCore>(null);
  const updateDimensions = () => {
    if (window.innerWidth < 1200) {
      chartRef.current?.getEchartsInstance()?.setOption({
        radar: {
          radius: '74%'
        }
      });
    } else if (window.innerWidth > 1200) {
      chartRef.current?.getEchartsInstance().setOption({
        radar: {
          radius: '85%'
        }
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

  const {
    getThemeColor,
    config: { theme }
  } = useAppContext();

  return (
    <ReactEChartsCore
      ref={chartRef}
      echarts={echarts}
      option={getDefaultOptions(getThemeColor, theme)}
      style={style}
    />
  );
};

export default MarketingCampaignChart;
