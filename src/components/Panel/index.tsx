import React from 'react';
import { InstrumentPresentation } from './InstrumentPresentation';
import { ModeList } from './ModeList';

// import { Container } from './styles';

const Panel: React.FC = () => {
  return (
      <>
        <InstrumentPresentation />
        <ModeList />
      </>
  );
}

export default Panel;