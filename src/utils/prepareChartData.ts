import { DataPoint } from "../model/types";

export const prepareChartData = (data: DataPoint[]) => {
  if (!data) return { xAxisData: [], seriesData: [] };

  const xAxisData = data.map(item => item.timestamp);
  const seriesData = data.map(item => item.value);
  return { xAxisData, seriesData };
};
