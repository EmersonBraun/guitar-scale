import React from 'react';
import { render, screen } from "@testing-library/react";
import { Settings } from '.';

describe('Testing Settings.jsx', () => {
  it('should be rendered', () => {
    render(<Settings/>);
    const component = screen.getByTestId('settings')
    expect(component).toBeInTheDocument()
  });
});