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
          <Box>
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(date: Dayjs | null) => updateFromDate(date)}
              sx={{
                borderRadius: '8px',
                backgroundColor: '#fff',
                margin: '0 4px',
              }}
            />
            <DatePicker
              label="To"
              value={toDate}
              onChange={(date: Dayjs | null) => updateToDate(date)}
              sx={{
                borderRadius: '8px',
                backgroundColor: '#fff',
                margin: '0 4px',
              }}
            />
          </Box>
        </Box>
        {isLoading ? (
          <CircularProgress />
        ) : hasError ? (
          <Typography>Error loading data</Typography>
        ) : (
          <Box>
            <Graph data={revenueData} title="Total Revenue" lineColor="#8884d8" />
            <Graph data={passengersData} title="Total Passengers" lineColor="#82ca9d" />
          </Box>
        )}
      </Box>
    </LocalizationProvider >
  );
};

export default Dashboard;
