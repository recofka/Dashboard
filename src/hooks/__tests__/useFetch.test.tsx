import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch';
import { fetchData } from '../../services/fetchData';
import { DataPoint } from '../../model/types';

jest.mock('../../services/fetchData');
const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;

interface TestComponentProps {
  endpoint: string;
  fromDate: string;
  toDate: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ endpoint, fromDate, toDate }) => {
  const { data, isLoading, error } = useFetch(endpoint, fromDate, toDate);
  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {data && data.map((item: DataPoint) => <div key={item.timestamp}>{item.value}</div>)}
    </div>
  );
};

describe('useFetch', () => {
  const endpoint = '/test-endpoint';
  const fromDate = '2024-01-01';
  const toDate = '2024-01-31';
  const mockData: DataPoint[] = [{ timestamp: '2024-01-01', value: 100 }];

  it('should fetch data successfully', async () => {
    mockedFetchData.mockResolvedValue(mockData);
    const { getByText } = render(<TestComponent endpoint={endpoint} fromDate={fromDate} toDate={toDate} />);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('100')).toBeInTheDocument();
    });
  });

  it('should handle error during data fetching', async () => {
    const errorMessage = 'Jest - Network error';
    mockedFetchData.mockRejectedValue(new Error(errorMessage));
    const { getByText } = render(<TestComponent endpoint={endpoint} fromDate={fromDate} toDate={toDate} />);
    await waitFor(() => {
      expect(getByText(`Error fetching ${endpoint} data: ${errorMessage}`)).toBeInTheDocument();
    });

  });
});
