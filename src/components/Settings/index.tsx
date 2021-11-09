import React, { useEffect, useState } from "react";
import {
  INSTRUMENT_TUNING_PRESETS,
  MODES,
  NOTES_FLAT,
  NOTES_SHARP
} from "../../constants";
import { useConfig } from "../../context/config";
import { Container } from "./style";

interface settingsProps {
  children?: React.ReactNode;
}

const CHECKS = [
  { value: "flats", label: "♭" },
  { value: "sharps", label: "♯" },
];

const DEFAULT_CONFIG = {
  instrument: "Guitar",
  accidental: "flats",
  numberOfFrets: 22,
  mode: "DORIAN",
  note: "C",
};
export const Settings = ({ children }: settingsProps) => {
  const {
    accidental,
    instrument,
    mode,
    note,
    numberOfFrets,
    setAccidental,
    setInstrument,
    setMode,
    setNote,
    setNumberOfFrets,
  } = useConfig();

  console.log({ accidental, instrument, mode, note, numberOfFrets });
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [notes, setNotes] = useState(NOTES_FLAT);

  useEffect(() => {
    if (accidental === "flats") {
      setNotes(NOTES_FLAT);
    } else {
      setNotes(NOTES_SHARP);
    }
  }, [accidental]);

  return (
    <Container className="settings" data-testid="settings">
      <label htmlFor="instrument-selector">Selected instrument:</label>
      <select
        name="instrument-selector"
        id="instrument-selector"
        onChange={(e) => setInstrument(e.target.value as any)}
      >
        {Object.keys(INSTRUMENT_TUNING_PRESETS).map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>

      <div className="accidental-selector">
        {CHECKS.map(({ label, value }, index) => (
          <>
            <input
              type="radio"
              className="acc-select"
              key={index}
              name="accidentals"
              value={accidental}
              onChange={() => setAccidental(value)}
              checked={accidental === value}
            />
            <label htmlFor="flats">{label}</label>
          </>
        ))}
      </div>

      <label htmlFor="number-of-frets">Number of frets: </label>
      <input
        type="number"
        id="number-of-frets"
        min="5"
        max="30"
        name="numberOfFrets"
        value={numberOfFrets}
        onChange={(e) => setNumberOfFrets(+e.target.value)}
      />

      <label htmlFor="mode">Selected mode:</label>
      <select name="mode" id="mode" onChange={(e) => setMode(e.target.value)}>
        {Object.keys(MODES).map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>

      <label htmlFor="note">Selected note:</label>
      <select name="note" id="note" onChange={(e) => setNote(e.target.value)}>
        {notes.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>
    </Container>
  );
};
