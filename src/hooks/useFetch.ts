import { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import { DataPoint } from '../model/types';

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
      return await fetchData(endpoint, fromDate, toDate)
        .then((response) =>
          setData(response))
        .catch((fetchError) =>
          setError(`Error fetching ${endpoint} data: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`))
        .finally(() => setIsLoading(false));
    };

    fetchDataFromApi();
  }, [endpoint, error, fromDate, toDate]);

  return { data, isLoading, error };
};
