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
      <ConfigProvider>
        <InstrumentSettings />
        <Settings />
        <NoteList />
        <Instrument />
        <ModeList />
      </ConfigProvider>
    </div>
  );
}

export default App;
