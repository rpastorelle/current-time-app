import { render, screen } from '@testing-library/react';
import App from './App';

test('renders current time', () => {
  render(<App />);
  const timeElement = screen.getByText(/Current time/i);
  expect(timeElement).toBeInTheDocument();
});
