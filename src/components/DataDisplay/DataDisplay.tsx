import React from 'react';
import { Box, Typography } from '@mui/material';

interface DataDisplayProps {
  title: string;
  data: { timestamp: string; value: number }[] | undefined;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ title, data }) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderData = (data: { timestamp: string; value: number }[] | undefined) => {
    if (!data || data.length === 0) {
      return <Typography>No data available</Typography>;
    }

    return (
      <ul>
        {data.map((item) => (
          <li key={item.timestamp}>
            Date: {item.timestamp}, Value: {item.value.toFixed(2)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      {renderData(data)}
    </Box>
  );
};

export default DataDisplay;
