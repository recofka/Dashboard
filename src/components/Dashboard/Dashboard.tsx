import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useDateRange } from '../../hooks/useDateRange';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, CircularProgress } from '@mui/material';
import { formatDateForApi } from '../../utils/dateUtils';
import DataDisplay from '../DataDisplay/DataDisplay';
import dayjs from 'dayjs';


const Dashboard: React.FC = () => {
  const { fromDate, toDate, updateFromDate, updateToDate } = useDateRange(dayjs(), dayjs());
  const formattedFromDate = formatDateForApi(fromDate);
  const formattedToDate = formatDateForApi(toDate);
  const { data: revenueData, isLoading: revenueLoading } = useFetch('total-revenue', formattedFromDate, formattedToDate);
  const { data: passengersData, isLoading: passengersLoading } = useFetch('total-pax', formattedFromDate, formattedToDate);

  if (revenueLoading || passengersLoading) {
    return <CircularProgress />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={(date) => updateFromDate(date)}
          />
          <DatePicker
            label="To"
            value={toDate}
            onChange={(date) => updateToDate(date)}
          />
        </Box>
        <DataDisplay title="Revenue Data" data={revenueData} />
        <DataDisplay title="Passengers Data" data={passengersData} />
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard;
