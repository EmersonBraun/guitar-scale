import React from 'react';
import { render, screen } from "@testing-library/react";
import { ModeList } from '.';

describe('Testing ModeList.jsx', () => {
  it('should be rendered', () => {
    render(<ModeList/>);
    const component = screen.getByTestId('mode-list')
    expect(component).toBeInTheDocument()
  });
});