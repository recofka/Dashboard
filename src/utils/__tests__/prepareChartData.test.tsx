import { prepareChartData } from '../prepareChartData';
import { DataPoint } from '../../model/types';

describe('formatChartData function', () => {
  it('should return empty arrays when data is falsy', () => {
    const result = prepareChartData(null as any);
    expect(result.xAxisData).toEqual([]);
    expect(result.seriesData).toEqual([]);
  });

  it('should correctly format data points', () => {
    const testData: DataPoint[] = [
      { timestamp: '2024-01-01', value: 100 },
      { timestamp: '2024-01-02', value: 150 },
      { timestamp: '2024-01-03', value: 200 },
    ];

    const result = prepareChartData(testData);
    expect(result.xAxisData).toEqual(['2024-01-01', '2024-01-02', '2024-01-03']);
    expect(result.seriesData).toEqual([100, 150, 200]);
  });

  it('should return empty arrays for empty data array', () => {
    const result = prepareChartData([]);
    expect(result.xAxisData).toEqual([]);
    expect(result.seriesData).toEqual([]);
  });
});
