import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { GraphProps } from '../../model/types';
import { Box, Typography } from '@mui/material';

const Graph: React.FC<GraphProps> = ({ title, data, lineColor }) => {
  const { xAxisData, seriesData } = data;

  const chartSetting = {
    height: 300,
    bar: {
      barThickness: 5,
    },
    colors: [lineColor || 'blue'],
  };

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      p={2}
      mt={2}
      sx={{
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 0 6px 2px rgba(0,0,0,.1)',
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        align="left"
        color={'#757575'}
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <BarChart
        grid={{ horizontal: true }}
        xAxis={[{ label: `${title} per day`, scaleType: 'band', data: xAxisData }]}
        series={[{ data: seriesData }]}
        {...chartSetting}
      >
      </BarChart>
    </Box>
  );
}

export default Graph;
