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
        <a href="https://github.com/EmersonBraun/guitar-scale" target="_blank">
          <img className="github" src="https://img.icons8.com/material-outlined/24/000000/github.png" alt="Github" />
        </a>
    </Container>
    </>
  );
}

export default Footer;