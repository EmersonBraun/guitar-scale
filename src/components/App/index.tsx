import React from "react";
import { ConfigProvider } from "../../context/config";
import "../../index.css";
import { Instrument } from "../Instrument";
import { NoteList } from "../NoteList";
import { Settings } from "../Settings";

function App() {
  return (
    <div>
      <ConfigProvider>
        <Settings />
        <Instrument />
        <NoteList />
      </ConfigProvider>
    </div>
  );
}

export default App;
