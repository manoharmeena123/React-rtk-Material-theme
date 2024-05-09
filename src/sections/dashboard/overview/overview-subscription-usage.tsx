import type { FC } from 'react';
import PropTypes from 'prop-types';
import type { ApexOptions } from 'apexcharts';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';

import { Chart } from 'src/components/chart';

type ChartSeries = {
  name: string;
  data: number[];
}[];

const useChartOptions = (): ApexOptions => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.mode === 'dark'
        ? theme.palette.primary.darkest
        : theme.palette.primary.light
    ],
    dataLabels: {
      enabled: false
    },
    legend: {
      labels: {
        colors: theme.palette.text.secondary
      },
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: false
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '32px'
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      y: {
        formatter: (value: number): string => `${value}k events`
      }
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    }
  };
};

interface OverviewSubscriptionUsageProps {
  chartSeries: ChartSeries;
}

export const OverviewSubscriptionUsage: FC<OverviewSubscriptionUsageProps> = (props) => {
  const { chartSeries } = props;
  const chartOptions = useChartOptions();

  return (
    <Card>
      <CardHeader
        subheader="Based on the selected period"
        title="Subscription Usage"
        action={
          <Tabs value="year">
            <Tab
              label="Year"
              value="year"
            />
            <Tab
              label="Month"
              value="month"
            />
            <Tab
              label="Week"
              value="week"
            />
          </Tabs>
        }
      />
      <Box sx={{ height: 336 }}>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="bar"
        />
      </Box>
    </Card>
  );
};

OverviewSubscriptionUsage.propTypes = {
  chartSeries: PropTypes.array.isRequired
};
