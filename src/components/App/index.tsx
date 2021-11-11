import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { ConfigProvider } from "../../context/config";
import "../../index.css";
import { Instrument } from "../Instrument";
import { InstrumentSettings } from "../InstrumentSettings";
import { ModeList } from "../ModeList";
import { NoteList } from "../NoteList";
import { Settings } from "../Settings";

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
        </ConfigProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
