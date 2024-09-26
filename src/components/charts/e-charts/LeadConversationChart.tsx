import { CSSProperties } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { getPastDates } from 'helpers/utils';
import { useAppContext } from 'providers/AppProvider';
import { TooltipComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { tooltipFormatterList } from 'helpers/echart-utils';

echarts.use([TooltipComponent, BarChart]);

const dates = getPastDates(4);

const getDefaultOptions = (getThemeColor: (name: string) => string) => ({
  color: [getThemeColor('primary'), getThemeColor('gray-300')],
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
    formatter: tooltipFormatterList
  },
  xAxis: {
    type: 'value',
    inverse: true,
    axisLabel: {
      show: false
    },
    show: false,
    data: dates,
    axisLine: {
      lineStyle: {
        color: getThemeColor('gray-300')
      }
    },
    axisTick: false
  },
  yAxis: {
    data: ['Closed Won', 'Objection', 'Offer', 'Qualify Lead', 'Created'],
    type: 'category',
    axisPointer: { type: 'none' },
    axisTick: 'none',
    splitLine: {
      interval: 5,
      lineStyle: {
        color: getThemeColor('gray-200')
      }
    },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      align: 'left',
      margin: 100,
      color: getThemeColor('gray-900')
    }
  },
  series: {
    name: 'Lead Conversion',
    type: 'bar',
    barWidth: '20px',
    showBackground: true,
    backgroundStyle: {
      borderRadius: [4, 0, 0, 4]
    },
    data: [
      {
        value: 1060,
        itemStyle: {
          color: getThemeColor('success-200'),
          borderRadius: [4, 0, 0, 4]
        },
        emphasis: {
          itemStyle: {
            color: getThemeColor('success-300')
          },
          label: {
            formatter: () => `{b| 53% }`,
            rich: {
              b: {
                color: getThemeColor('white')
              }
            }
          }
        },
        label: {
          show: true,
          position: 'inside',
          formatter: () => `{b| 53%}`,
          rich: {
            b: {
              color: getThemeColor('success-600'),
              fontWeight: 500,
              padding: [0, 5, 0, 0]
            }
          }
        }
      },
      {
        value: 1200,
        itemStyle: {
          color: getThemeColor('info-200'),
          borderRadius: [4, 0, 0, 4]
        },
        emphasis: {
          itemStyle: {
            color: getThemeColor('info-300')
          },
          label: {
            formatter: () => `{b| 60% }`,
            rich: {
              b: {
                color: getThemeColor('white')
              }
            }
          }
        },
        label: {
          show: true,
          position: 'inside',
          formatter: () => `{b| 60%}`,
          rich: {
            b: {
              color: getThemeColor('info-600'),
              fontWeight: 500,
              padding: [0, 5, 0, 0]
            }
          }
        }
      },
      {
        value: 1600,
        itemStyle: {
          color: getThemeColor('primary-200'),
          borderRadius: [4, 0, 0, 4]
        },
        emphasis: {
          itemStyle: {
            color: getThemeColor('primary-300')
          },
          label: {
            formatter: () => `{b| 80% }`,
            rich: {
              b: {
                color: getThemeColor('white')
              }
            }
          }
        },
        label: {
          show: true,
          position: 'inside',
          formatter: () => `{b| 80% }`,
          rich: {
            b: {
              color: getThemeColor('primary-600'),
              fontWeight: 500,
              padding: [0, 5, 0, 0]
            }
          }
        }
      },
      {
        value: 1800,
        itemStyle: {
          color: getThemeColor('warning-200'),
          borderRadius: [4, 0, 0, 4]
        },
        emphasis: {
          itemStyle: {
            color: getThemeColor('warning-300')
          },
          label: {
            formatter: () => `{b| 90% }`,
            rich: {
              b: {
                color: getThemeColor('white')
              }
            }
          }
        },
        label: {
          show: true,
          position: 'inside',
          formatter: () => `{b|90%}`,
          rich: {
            b: {
              color: getThemeColor('warning-600'),
              fontWeight: 500,
              padding: [0, 5, 0, 0]
            }
          }
        }
      },
      {
        value: 2000,
        itemStyle: {
          color: getThemeColor('danger-200'),
          borderRadius: [4, 0, 0, 4]
        },
        emphasis: {
          itemStyle: {
            color: getThemeColor('danger-300')
          },
          label: {
            formatter: () => `{a|100%}`,
            rich: {
              a: {
                color: getThemeColor('white')
              }
            }
          }
        },
        label: {
          show: true,
          position: 'inside',
          formatter: () => `{a|100%}`,
          rich: {
            a: {
              color: getThemeColor('danger-600'),
              fontWeight: 500
            }
          }
        }
      }
    ],
    barGap: '50%'
  },
  grid: {
    right: 5,
    left: 100,
    bottom: 0,
    top: '5%',
    containLabel: false
  },
  animation: false
});

const LeadConversationChart = ({ style }: { style: CSSProperties }) => {
  const { getThemeColor } = useAppContext();

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={getDefaultOptions(getThemeColor)}
      style={style}
    />
  );
};

export default LeadConversationChart;
