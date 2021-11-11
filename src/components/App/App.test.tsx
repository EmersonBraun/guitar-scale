import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '.';

test('renders some', () => {
  render(<App />);
  const some = screen.getByText(/Selected instrument:/i);
  expect(some).toBeInTheDocument();
});
