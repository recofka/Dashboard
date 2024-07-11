import { useState } from 'react';
import { Dayjs } from 'dayjs';

interface DateRangeResult {
  fromDate: Dayjs;
  toDate: Dayjs;
  updateFromDate: (date: Dayjs | null) => void;
  updateToDate: (date: Dayjs | null) => void;
}

export const useDateRange = (initialFromDate: Dayjs, initialToDate: Dayjs): DateRangeResult => {
  const [fromDate, setFromDate] = useState<Dayjs>(initialFromDate);
  const [toDate, setToDate] = useState<Dayjs>(initialToDate);

  const updateFromDate = (date: Dayjs | null) => {
    if (date !== null) {
      setFromDate(date);
    }
  };

  const updateToDate = (date: Dayjs | null) => {
    if (date !== null) {
      setToDate(date);
    }
  };

  return { fromDate, toDate, updateFromDate, updateToDate };
};
