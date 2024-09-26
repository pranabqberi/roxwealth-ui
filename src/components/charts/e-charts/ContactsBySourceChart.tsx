import { CSSProperties } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { useAppContext } from 'providers/AppProvider';
import { TooltipComponent } from 'echarts/components';
import { contactSourceData } from 'data/crm/dashboardData';

echarts.use([TooltipComponent]);

const getDefaultOptions = (getThemeColor: (name: string) => string) => ({
  color: [
    getThemeColor('primary'),
    getThemeColor('success'),
    getThemeColor('info'),
    getThemeColor('info-300'),
    getThemeColor('danger-200'),
    getThemeColor('warning-300')
  ],
  tooltip: {
    trigger: 'item',
    borderWidth: 0
  },
  responsive: true,
  maintainAspectRatio: false,

  series: [
    {
      name: 'Contacts by Source',
      type: 'pie',
      radius: ['55%', '90%'],
      startAngle: 90,
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: getThemeColor('gray-soft'),
        borderWidth: 3
      },

      label: {
        show: false
      },
      emphasis: {
        label: {
          show: false
        }
      },
      labelLine: {
        show: false
      },
      data: contactSourceData
    }
  ],
  grid: {
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    containLabel: false
  }
});

const ContactsBySourceChart = ({ style }: { style: CSSProperties }) => {
  const { getThemeColor } = useAppContext();

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={getDefaultOptions(getThemeColor)}
      style={style}
    />
  );
};

export default ContactsBySourceChart;
