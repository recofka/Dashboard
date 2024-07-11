import { fetchData, API_URL } from '../fetchData';

declare let global: {
  fetch: jest.Mock;
};

describe('fetchData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = [{ id: 1, value: 100 }];
    const endpoint = 'test-endpoint';
    const fromDate = '2024-01-01';
    const toDate = '2024-01-31';

    // Mocking the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const result = await fetchData(endpoint, fromDate, toDate);

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${endpoint}?from=${fromDate}&to=${toDate}`);
  });

  it('should throw an error when fetch fails', async () => {
    const endpoint = 'test-endpoint';
    const fromDate = '2023-01-01';
    const toDate = '2023-01-31';

    // Mocking the fetch function to simulate a failed request
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    ) as jest.Mock;

    await expect(fetchData(endpoint, fromDate, toDate)).rejects.toThrow('HTTP error! Status: 500');
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${endpoint}?from=${fromDate}&to=${toDate}`);
  });

  it('should throw an error when there is a network error', async () => {
    const endpoint = 'test-endpoint';
    const fromDate = '2024-01-01';
    const toDate = '2024-01-31';

    // Mocking the fetch function to simulate a network error
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    await expect(fetchData(endpoint, fromDate, toDate)).rejects.toThrow('Error fetching test-endpoint data: Network error');
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${endpoint}?from=${fromDate}&to=${toDate}`);
  });
});
