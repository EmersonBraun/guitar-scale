import React from 'react';
import { render, screen } from "@testing-library/react";
import { InstrumentSettings } from '.';

describe('Testing InstrumentSettings.jsx', () => {
  it('should be rendered', () => {
    render(<InstrumentSettings/>);
    const component = screen.getByTestId('instrument-settings')
    expect(component).toBeInTheDocument()
  });
});