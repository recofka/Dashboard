import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import * as useFetch from '../../../hooks/useFetch';

jest.mock('../../../hooks/useFetch');
const useFetchMock = useFetch as jest.Mocked<typeof useFetch>;

const mockData = [
  { timestamp: '2024-07-01', value: 1126.3970050016592 },
  { timestamp: '2024-07-02', value: 1233.4099879467929 },
  { timestamp: '2024-07-03', value: 1049.2452635057316 }
];


describe('Dashboard Component', () => {
  beforeEach(() => {
    useFetchMock.useFetch.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null
    });
  });

  it('should render DatePickers from and to', () => {
    render(<Dashboard />);
    const calendarIcons = screen.getAllByTestId('CalendarIcon');
    expect(calendarIcons).toHaveLength(2);
  });

});
