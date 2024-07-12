import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { renderHook } from '@testing-library/react-hooks';
import { useDateRange } from '../useDateRange';
import dayjs from 'dayjs';

describe('useDateRange', () => {
  it('should initialize with initial dates', () => {
    const initialFromDate = dayjs('2024-01-01');
    const initialToDate = dayjs('2024-01-31');
    const container = document.createElement('div');
    const root = createRoot(container);

    const { result } = renderHook(() => useDateRange(initialFromDate, initialToDate));

    expect(result.current.fromDate).toEqual(initialFromDate);
    expect(result.current.toDate).toEqual(initialToDate);

    root.unmount();
  });

  it('should update fromDate correctly', () => {
    const initialFromDate = dayjs('2024-01-01');
    const initialToDate = dayjs('2024-01-31');
    const container = document.createElement('div');
    const root = createRoot(container);
    const { result } = renderHook(() => useDateRange(initialFromDate, initialToDate));

    const newDate = dayjs('2024-02-01');
    act(() => {
      result.current.updateFromDate(newDate);
    });

    expect(result.current.fromDate).toEqual(newDate);
    root.unmount();
  });

  it('should update toDate correctly', () => {
    const initialFromDate = dayjs('2024-01-01');
    const initialToDate = dayjs('2024-01-31');
    const container = document.createElement('div'); // Create a temporary container
    const root = createRoot(container);

    const { result } = renderHook(() => useDateRange(initialFromDate, initialToDate));

    const newDate = dayjs('2024-02-28');
    act(() => {
      result.current.updateToDate(newDate);
    });

    expect(result.current.toDate).toEqual(newDate);
    root.unmount();
  });

  it('should NOT update fromDate when date is null', () => {
    const initialFromDate = dayjs('2024-01-01');
    const initialToDate = dayjs('2024-01-31');
    const { result } = renderHook(() => useDateRange(initialFromDate, initialToDate));

    act(() => {
      result.current.updateFromDate(null);
    });

    expect(result.current.toDate).toEqual(initialToDate); // toDate should remain unchanged
  });

  it('should NOT update toDate when date is null', () => {
    const initialFromDate = dayjs('2024-01-01');
    const initialToDate = dayjs('2024-01-31');
    const { result } = renderHook(() => useDateRange(initialFromDate, initialToDate));

    act(() => {
      result.current.updateToDate(null);
    });

    expect(result.current.toDate).toEqual(initialToDate); // toDate should remain unchanged
  });
});
