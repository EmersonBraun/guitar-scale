import React from 'react';
import { render, screen } from "@testing-library/react";
import { NoteList } from '.';

describe('Testing NoteList.jsx', () => {
  it('should be rendered', () => {
    render(<NoteList/>);
    const component = screen.getByTestId('note-list')
    expect(component).toBeInTheDocument()
  });
});