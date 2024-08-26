import { render, screen } from '@testing-library/react';
import App from '.';

test('renders Personal Finance Tracker header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Personal Finance Tracker/i);
  expect(headerElement).toBeInTheDocument();
});