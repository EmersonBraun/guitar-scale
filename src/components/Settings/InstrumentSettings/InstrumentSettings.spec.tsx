import { render, screen } from "@testing-library/react";
import React from 'react';
import { InstrumentSettings } from '.';
import { ConfigProvider } from '../../../context/config';

describe('Testing InstrumentSettings.jsx', () => {
  it('should be rendered', () => {
    render(
      <ConfigProvider>
        <InstrumentSettings/>
      </ConfigProvider>
    );
    const component = screen.getByTestId('instrument-settings')
    expect(component).toBeInTheDocument()
  });
});