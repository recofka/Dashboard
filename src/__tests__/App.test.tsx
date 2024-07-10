import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
    render(<App />);
    const countButton = screen.getByText(/count is 0/i);
    expect(countButton).toBeInTheDocument();
});

test('increments count when button is clicked', () => {
    render(<App />);
    const countButton = screen.getByText(/count is 0/i);
    fireEvent.click(countButton);

    const incrementedCountButton = screen.getByText(/count is 1/i);
    expect(incrementedCountButton).toBeInTheDocument();
});
