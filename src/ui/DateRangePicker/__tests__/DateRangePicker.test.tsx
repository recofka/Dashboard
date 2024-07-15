import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateRangePicker from '../DateRangePicker';
import dayjs from 'dayjs';

describe('DateRangePicker', () => {
  const fromDate = dayjs('2024-07-01');
  const toDate = dayjs('2024-07-31');
  const mockOnFromDateChange = jest.fn();
  const mockOnToDateChange = jest.fn();

  it('Should renders DatePicker components with correct labels', () => {
    render(
      <DateRangePicker
        fromDate={fromDate}
        toDate={toDate}
        updateFromDate={mockOnFromDateChange}
        updateToDate={mockOnToDateChange}
      />
    );

    expect(screen.getByLabelText(/From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To/i)).toBeInTheDocument();
  });
});
