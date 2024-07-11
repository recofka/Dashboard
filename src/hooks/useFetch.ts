import { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import { DataObject } from '../types/types';

export const useFetch = (endpoint: string, fromDate: string, toDate: string) => {
  const [data, setData] = useState<DataObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(endpoint, fromDate, toDate);
        setData(response);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error fetching ${endpoint} data:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, [endpoint, fromDate, toDate]);

  return { data, isLoading };
};
