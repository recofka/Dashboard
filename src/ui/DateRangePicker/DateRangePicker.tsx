import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangeResult } from '../../model/types';

const DateRangePicker: React.FC<DateRangeResult> = ({ fromDate, toDate, updateFromDate, updateToDate }) => {
  const cssConfig = {
    borderRadius: '8px',
    backgroundColor: '#fff',
    margin: '0 4px',
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <DatePicker
          label="From"
          value={fromDate}
          onChange={updateFromDate}
          sx={cssConfig}
        />
        <DatePicker
          label="To"
          value={toDate}
          onChange={updateToDate}
          sx={cssConfig}
        />
      </Box>
    </LocalizationProvider >
  )
}

export default DateRangePicker;
