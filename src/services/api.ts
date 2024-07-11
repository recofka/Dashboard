import { DataObject } from '../types/types';

const API_URL = 'http://localhost:8080/api';

export const fetchData = async (endpoint: string, fromDate: string, toDate: string): Promise<DataObject[]> => {
    const apiUrl = `${API_URL}/${endpoint}?from=${fromDate}&to=${toDate}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();

    } catch (error: any) {
        throw new Error(`Error fetching ${endpoint} data: ${error.message}`);
    }
};
