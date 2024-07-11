/**
 * Formats a date to the API's expected format.
 * @param date The date to format (Dayjs or null).
 * @returns The formatted date in 'YYYY-MM-DD' format or an empty string if date is null.
 */

import dayjs from 'dayjs';

export const formatDateForApi = (date: dayjs.Dayjs | null) => {
  return date ? date.format('YYYY-MM-DD') : '';
};

