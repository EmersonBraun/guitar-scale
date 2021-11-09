import React from 'react';
import { render, screen } from "@testing-library/react";
import { Instrument } from '.';

describe('Testing Instrument.jsx', () => {
  it('should be rendered', () => {
    render(<Instrument/>);
    const component = screen.getByTestId('instrument')
    expect(component).toBeInTheDocument()
  });
});