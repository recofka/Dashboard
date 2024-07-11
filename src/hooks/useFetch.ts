import { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import { DataPoint } from '../types/types';

interface FetchResult {
  data: DataPoint[];
  isLoading: boolean;
  error: string | null;
}

export const useFetch = (endpoint: string, fromDate: string, toDate: string): FetchResult => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(endpoint, fromDate, toDate);
        setData(response);
      } catch (errorToFetch) {
        setError(`Error fetching ${endpoint} data: ${errorToFetch instanceof Error ? errorToFetch.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, [endpoint, fromDate, toDate]);

  return { data, isLoading, error };
};
