import { DataPoint } from '../types/types';

export const API_URL = 'http://localhost:8080/api';

export const fetchData = async (endpoint: string, fromDate: string, toDate: string): Promise<DataPoint[]> => {
  const apiUrl = `${API_URL}/${endpoint}?from=${fromDate}&to=${toDate}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error fetching ${endpoint} data: ${error.message}`);
  }
};
