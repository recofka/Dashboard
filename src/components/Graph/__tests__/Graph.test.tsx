import { render, screen } from '@testing-library/react';
import Graph from '../Graph';

const mockData = [
  { timestamp: '2024-07-01', value: 1126.3970050016592 },
  { timestamp: '2024-07-02', value: 1233.4099879467929 },
  { timestamp: '2024-07-03', value: 1049.2452635057316 }
];

describe('Graph Component', () => {
  it('should renders the Graph component with title', () => {
    render(<Graph title="Test Graph" data={mockData} />);
    const titleElement = screen.getByText(/Test Graph/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the graph with correct data', () => {
    render(
      <Graph data={mockData} title="Test Graph" lineColor="#8884d8" />
    );

    const element = screen.getByText(/2024-07-01/i);
    expect(element).toBeInTheDocument();
  });

});


