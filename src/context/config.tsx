import React, { useState } from "react";
import { Instruments } from "../services/instruments";

export const DEFAULT_CONFIG = {
  instrument: "Guitar",
  accidental: "flats",
  numberOfFrets: 22,
  mode: "DORIAN",
  note: "C",
};
export const ConfigContext = React.createContext({} as Expose);

interface ConfigProps {
  children?: React.ReactNode;
}

interface Expose {
  instrument: Instruments;
  accidental: string;
  numberOfFrets: number;
  mode: string;
  note: string;

  setInstrument: (data: Instruments) => void;
  setAccidental: (data: string) => void;
  setNumberOfFrets: (data: number) => void;
  setMode: (data: string) => void;
  setNote: (data: string) => void;
}

export const ConfigProvider = ({ children }: ConfigProps) => {
  const [instrument, setInstrument] = useState<Instruments>("Guitar");
  const [accidental, setAccidental] = useState("flats");
  const [numberOfFrets, setNumberOfFrets] = useState(22);
  const [mode, setMode] = useState("DORIAN");
  const [note, setNote] = useState("C");

  const expose: Expose = {
    instrument,
    accidental,
    numberOfFrets,
    mode,
    note,

    setInstrument,
    setAccidental,
    setNumberOfFrets,
    setMode,
    setNote,
  };
  return (
    <ConfigContext.Provider value={expose}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = React.useContext(ConfigContext);

  if (context === undefined) {
    throw new Error("config must be used within a Provider");
  }
  return context;
};
