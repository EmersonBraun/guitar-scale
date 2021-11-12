import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { ConfigProvider } from "../../context/config";
import "../../index.css";
import { Instrument } from "../Instrument";
import { InstrumentSettings } from "../InstrumentSettings";
import { ModeList } from "../ModeList";
import { NoteList } from "../NoteList";
import { Settings } from "../Settings";
import { BuyACoffeImg } from "./style";

function App() {
  return (
    <div>
      <ChakraProvider>
        <ConfigProvider>
          <InstrumentSettings />
          <Settings />
          <NoteList />
          <Instrument />
          <ModeList />
          <a href="https://www.buymeacoffee.com/emersonbraun" target="_blank" rel="noreferrer">
            <BuyACoffeImg
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
            />
          </a>
        </ConfigProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
