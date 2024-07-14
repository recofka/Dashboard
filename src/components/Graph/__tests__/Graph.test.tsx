import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Graph from '../Graph';
import { DataPoint } from '@/types/types';

// Mock data for testing
const mockData: DataPoint[] = [
  { timestamp: '2023-07-01', value: 10 },
  { timestamp: '2023-07-02', value: 20 },
  { timestamp: '2023-07-03', value: 30 }
];

test('renders the Graph component with title', () => {
  render(<Graph title="Test Graph" data={mockData} />);
  const titleElement = screen.getByText(/Test Graph/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the correct number of bars in the graph', () => {
  render(<Graph title="Test Graph" data={mockData} />);

  // Check if BarChart receives the correct props
  const bars = screen.getAllByRole('bar');
  expect(bars).toHaveLength(mockData.length);
});

test('renders the Graph component with custom line color', () => {
  render(<Graph title="Colored Graph" data={mockData} lineColor="red" />);
  const graphElement = screen.getByTestId('graph-element');

  // Check if the lineColor is applied
  expect(graphElement).toHaveStyle('color: red');
});
