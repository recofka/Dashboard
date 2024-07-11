import { useState } from 'react';

export const useDateRange = (initialFromDate: string, initialToDate: string) => {
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);

  const updateFromDate = (date: string) => {
    setFromDate(date);
  };

  const updateToDate = (date: string) => {
    setToDate(date);
  };

  return { fromDate, toDate, updateFromDate, updateToDate };
};
