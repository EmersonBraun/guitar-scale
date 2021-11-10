import React, { useState } from "react";
import { Instruments } from "../services/instruments";

export const DEFAULT_CONFIG = {
  instrument: "Guitar" as Instruments,
  accidental: "flats" as Accidental,
  numberOfFrets: 22,
  mode: "DORIAN",
  note: {
    flats: "C",
    sharps: "C",
    index: 1,
  } as NoteInterface,
};
export const ConfigContext = React.createContext({} as Expose);

export type Accidental = "flats" | "sharps";
interface ConfigProps {
  children?: React.ReactNode;
}

export interface NoteInterface {
  flats: string;
  sharps: string;
  index: number;
}

interface Expose {
  instrument: Instruments;
  accidental: Accidental;
  numberOfFrets: number;
  mode: string;
  note: NoteInterface;
  noteHover?: NoteInterface;

  setInstrument: (data: Instruments) => void;
  setAccidental: (data: Accidental) => void;
  setNumberOfFrets: (data: number) => void;
  setMode: (data: string) => void;
  setNote: (data: NoteInterface) => void;
  setNoteHover: (data: NoteInterface | undefined) => void;
}

export const ConfigProvider = ({ children }: ConfigProps) => {
  const [instrument, setInstrument] = useState<Instruments>(DEFAULT_CONFIG.instrument);
  const [accidental, setAccidental] = useState<Accidental>(DEFAULT_CONFIG.accidental);
  const [numberOfFrets, setNumberOfFrets] = useState(
    DEFAULT_CONFIG.numberOfFrets
  );
  const [mode, setMode] = useState(DEFAULT_CONFIG.mode);
  const [note, setNote] = useState(DEFAULT_CONFIG.note);
  const [noteHover, setNoteHover] = useState<NoteInterface | undefined>(undefined);

  const expose: Expose = {
    instrument,
    accidental,
    numberOfFrets,
    mode,
    note,
    noteHover,

    setInstrument,
    setAccidental,
    setNumberOfFrets,
    setMode,
    setNote,
    setNoteHover
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
