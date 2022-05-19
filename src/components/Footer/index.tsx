import React from 'react';
// import Metronome from '../Metronome';
import { BuyACoffeImg, Container } from './style';

const Footer: React.FC = () => {
  return (
    <>
    {/* <Metronome /> */}
    <Container>
      <a href="https://www.buymeacoffee.com/emersonbraun" target="_blank" rel="noreferrer">
      <BuyACoffeImg
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
      />
    </a>
    </Container>
    </>
  );
}

export default Footer;