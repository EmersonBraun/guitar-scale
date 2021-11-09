import React from 'react';
import { render, screen } from "@testing-library/react";
import { Note } from '.';

describe('Testing Note.jsx', () => {
  it('should be rendered', () => {
    render(<Note/>);
    const component = screen.getByTestId('note')
    expect(component).toBeInTheDocument()
  });
});