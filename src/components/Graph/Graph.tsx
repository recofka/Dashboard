import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataPoint } from '@/types/types';

interface GraphProps {
  title: string;
  data: DataPoint[];
  lineColor?: string;
}

const Graph: React.FC<GraphProps> = ({ title, data, lineColor }) => {
  const [xAxisData, setXAxisData] = useState<string[]>([]);
  const [seriesData, setSeriesData] = useState<number[]>([]);

  const chartSetting = {
    height: 300,
    bar: {
      barThickness: 5,
    },
    colors: [lineColor || 'blue']
  };

  useEffect(() => {
    const xAxisTemp = data.map(item => item.timestamp);
    const seriesTemp = data.map(item => item.value);

    setXAxisData(xAxisTemp);
    setSeriesData(seriesTemp);
  }, [data]);

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        xAxis={[{ label: title, scaleType: 'band', data: xAxisData }]}
        series={[{ data: seriesData }]}
        {...chartSetting}
      >
      </BarChart>
    </div>
  );
}

export default Graph;
