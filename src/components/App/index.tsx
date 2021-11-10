import React from "react";
import { ConfigProvider } from "../../context/config";
import "../../index.css";
import { Instrument } from "../Instrument";
import { ModeList } from "../ModeList";
import { NoteList } from "../NoteList";
import { Settings } from "../Settings";

function App() {
  return (
    <div>
      <ConfigProvider>
        <Settings />
        <Instrument />
        <NoteList />
        <ModeList />
      </ConfigProvider>
    </div>
  );
}

export default App;
