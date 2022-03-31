import React from 'react';
import { InstrumentPresentation } from './InstrumentPresentation';
import { ModeList } from './ModeList';
import { NoteList } from './NoteList';

// import { Container } from './styles';

const Panel: React.FC = () => {
  return (
      <>
        <NoteList />
        <InstrumentPresentation />
        <ModeList />
      </>
  );
}

export default Panel;