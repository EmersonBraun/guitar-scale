import React from 'react';
import { render, screen } from "@testing-library/react";
import { String } from '.';

describe('Testing String.jsx', () => {
  it('should be rendered', () => {
    render(<String/>);
    const component = screen.getByTestId('string')
    expect(component).toBeInTheDocument()
  });
});