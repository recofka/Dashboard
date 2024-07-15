import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useDateRange } from '../../hooks/useDateRange';
import { Box, CircularProgress, Typography } from '@mui/material';
import { formatDateForApi } from '../../utils/dateUtils';
import { prepareChartData } from '../../utils/prepareChartData';
import DateRangePicker from '../../ui/DateRangePicker/DateRangePicker';
import Graph from '../../ui/Graph/Graph';
import dayjs from 'dayjs';

const Dashboard: React.FC = () => {
  const today = dayjs();
  const oneMonthBefore = today.subtract(1, 'month');
  const { fromDate, toDate, updateFromDate, updateToDate } = useDateRange(oneMonthBefore, dayjs());
  const formattedFromDate = formatDateForApi(fromDate);
  const formattedToDate = formatDateForApi(toDate);

  const { data: revenueData, error: revenueError, isLoading: revenueLoading } = useFetch('total-revenue', formattedFromDate, formattedToDate);
  const { data: passengersData, error: passengersError, isLoading: passengersLoading } = useFetch('total-pax', formattedFromDate, formattedToDate);

  const isLoading = revenueLoading || passengersLoading;
  const hasError = Boolean(revenueError || passengersError);

  const revenueChartDisplayData = prepareChartData(revenueData);
  const passengersChartDisplayData = prepareChartData(passengersData);

  return (
    <Box sx={{ gap: 2 }}>
      <Box component="section"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h1"
          gutterBottom
          align="left"
          color={'#7c00a6'}
          sx={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '1.5px' }}
        >
          Dashboard Overview
        </Typography>

        <DateRangePicker
          fromDate={fromDate}
          toDate={toDate}
          updateFromDate={updateFromDate}
          updateToDate={updateToDate}
        />

      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : hasError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <Box>
          <Graph data={revenueChartDisplayData} title="Total Revenue" lineColor="#8884d8" />
          <Graph data={passengersChartDisplayData} title="Total Passengers" lineColor="#82ca9d" />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
