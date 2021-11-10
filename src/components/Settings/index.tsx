import React from "react";
import { INSTRUMENT_TUNING_PRESETS, MODES } from "../../constants";
import { Accidental, useConfig } from "../../context/config";
import { Container } from "./style";

interface settingsProps {
  children?: React.ReactNode;
}

const CHECKS = [
  { value: "flats", label: "♭" },
  { value: "sharps", label: "♯" },
];

export const Settings = ({ children }: settingsProps) => {
  const {
    instrument,
    mode,
    accidental,
    numberOfFrets,
    setAccidental,
    setInstrument,
    setMode,
    setNumberOfFrets,
  } = useConfig();

  return (
    <Container className="settings" data-testid="settings">
      <label htmlFor="instrument-selector">Selected instrument:</label>
      <select
        name="instrument-selector"
        id="instrument-selector"
        onChange={(e) => setInstrument(e.target.value as any)}
      >
        {Object.keys(INSTRUMENT_TUNING_PRESETS).map((value, index) => (
          <option selected={value === instrument} key={index}>
            {value}
          </option>
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
              onChange={() => setAccidental(value as Accidental)}
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
          <option selected={value === mode} key={index}>{value}</option>
        ))}
      </select>
    </Container>
  );
};
