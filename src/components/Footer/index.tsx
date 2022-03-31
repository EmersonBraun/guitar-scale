import React from 'react';
import { BuyACoffeImg } from './style';

const Footer: React.FC = () => {
  return (
    <a href="https://www.buymeacoffee.com/emersonbraun" target="_blank" rel="noreferrer">
    <BuyACoffeImg
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      alt="Buy Me A Coffee"
    />
  </a>
  );
}

export default Footer;