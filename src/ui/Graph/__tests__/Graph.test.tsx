import { render, screen } from '@testing-library/react';
import Graph from '../Graph';

const mockData =
{
  "xAxisData": ["2024-07-01", "2024-07-02"],
  "seriesData": [10, 20]
};

describe('Graph Component', () => {
  it('should renders the Graph component with title', () => {
    render(<Graph title="Test Graph" data={mockData} />);
    const titleElement = screen.getByText(/Test Graph per day/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the graph with correct data', () => {
    render(
      <Graph data={mockData} title="Test Graph 2" lineColor="#8884d8" />
    );

    const element = screen.getByText(/2024-07-01/i);
    expect(element).toBeInTheDocument();
  });
});
