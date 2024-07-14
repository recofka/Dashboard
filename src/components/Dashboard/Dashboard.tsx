import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useDateRange } from '../../hooks/useDateRange';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, CircularProgress, Typography } from '@mui/material';
import { formatDateForApi } from '../../utils/dateUtils';
import Graph from '../Graph/Graph';
import dayjs, { Dayjs } from 'dayjs';


const Dashboard: React.FC = () => {
  const { fromDate, toDate, updateFromDate, updateToDate } = useDateRange(dayjs(), dayjs());
  const formattedFromDate = formatDateForApi(fromDate);
  const formattedToDate = formatDateForApi(toDate);

  const { data: revenueData, error: revenueError, isLoading: revenueLoading } = useFetch('total-revenue', formattedFromDate, formattedToDate);
  const { data: passengersData, error: passengersError, isLoading: passengersLoading } = useFetch('total-pax', formattedFromDate, formattedToDate);

  const isLoading = revenueLoading || passengersLoading;
  const hasError = revenueError || passengersError;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={(date: Dayjs | null) => updateFromDate(date)}
          />
          <DatePicker
            label="To"
            value={toDate}
            onChange={(date: Dayjs | null) => updateToDate(date)}
          />
        </Box>

        {isLoading ? (
          <CircularProgress />
        ) : hasError ? (
          <Typography>Error loading data</Typography>
        ) : (
          <>
            <Graph data={revenueData} title="Total Revenue" lineColor="#8884d8" />
            <Graph data={passengersData} title="Total Passengers" lineColor="#82ca9d" />
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard;
