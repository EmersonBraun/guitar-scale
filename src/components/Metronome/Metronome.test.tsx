import { render, screen } from '@testing-library/react';
import React from 'react';
import Metronome from '.';

test('renders some', () => {
  render(<Metronome />);
  const some = screen.getByText(/Selected instrument:/i);
  expect(some).toBeInTheDocument();
});
