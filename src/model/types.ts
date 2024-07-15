import { Dayjs } from 'dayjs';

export interface DataPoint {
  timestamp: string;
  value: number;
}

export interface GraphProps {
  title: string;
  data: DataPoint[];
  lineColor?: string;
}

export interface DateRangeResult {
  fromDate: Dayjs;
  toDate: Dayjs;
  updateFromDate: (date: Dayjs | null) => void;
  updateToDate: (date: Dayjs | null) => void;
}
