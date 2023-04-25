import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mail Box Client', () => {
  render(<App />);
  const linkElement = screen.getByText('Mail-Box-Client');
  expect(linkElement).toBeInTheDocument();
});
