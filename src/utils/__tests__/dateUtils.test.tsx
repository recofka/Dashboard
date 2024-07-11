import dayjs from 'dayjs';
import { formatDateForApi } from '../dateUtils';

describe('formatDate function', () => {
  it('should format valid date - YYYMMDD', () => {
    const date = dayjs('01-01-2024');
    expect(formatDateForApi(date)).toBe('2024-01-01');
  });

  it('should return empty string for null date', () => {
    const date = null;
    expect(formatDateForApi(date)).toBe('');
  });
});
