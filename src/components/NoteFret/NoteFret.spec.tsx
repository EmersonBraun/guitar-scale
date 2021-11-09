import React from 'react';
import { render, screen } from "@testing-library/react";
import { NoteFret } from '.';

describe('Testing NoteFret.jsx', () => {
  it('should be rendered', () => {
    render(<NoteFret/>);
    const component = screen.getByTestId('note-fret')
    expect(component).toBeInTheDocument()
  });
});