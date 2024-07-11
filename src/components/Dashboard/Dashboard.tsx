import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useDateRange } from '../../hooks/useDateRange';

const Dashboard: React.FC = () => {
  const { fromDate, toDate, updateFromDate, updateToDate } = useDateRange('2024-07-01', '2024-07-10');
  const { data: revenueData, isLoading: revenueLoading } = useFetch('total-revenue', fromDate, toDate);
  const { data: passengersData, isLoading: passengersLoading } = useFetch('total-pax', fromDate, toDate);

  if (revenueLoading || passengersLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Sales Dashboard</h1>

      <div>
        <label>
          From:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => updateFromDate(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={toDate}
            onChange={(e) => updateToDate(e.target.value)}
          />
        </label>
      </div>

      <div>
        <h2>Revenue Data</h2>
        {renderData(revenueData)}
      </div>

      <div>
        <h2>Passengers Data</h2>
        {renderData(passengersData)}
      </div>
    </div>
  );
};

const renderData = (data: { timestamp: string; value: number }[]) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.timestamp}>
          Date: {item.timestamp}, Value: {item.value.toFixed(2)}
        </li>
      ))}
    </ul>
  );
};

export default Dashboard;
