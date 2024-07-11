import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
    render(<App />);
    const mainTitle = screen.getByText("Sqills Dash");
    expect(mainTitle).toBeInTheDocument();
});
