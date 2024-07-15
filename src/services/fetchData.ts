import { DataPoint } from '../model/types';

export const API_URL = 'http://localhost:8080/api';

export const fetchData = async (endpoint: string, fromDate: string, toDate: string): Promise<DataPoint[]> => {
  const apiUrl = `${API_URL}/${endpoint}?from=${fromDate}&to=${toDate}`;
  return await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json()
    })
    .catch((error) => { throw new Error(`Error fetching ${endpoint} data: ${error.message}`) });
};
