import React from "react";
import { INSTRUMENT_TUNING_PRESETS } from "../../constants";
import { useConfig } from "../../context/config";
import { Container } from "./style";

interface instrumentSettingsProps {
  children?: React.ReactNode;
}
export const InstrumentSettings = ({ children }: instrumentSettingsProps) => {
  const {
    numberOfFrets,
    setInstrument,
    setNumberOfFrets,
  } = useConfig();

  return (
    <Container className="settings" data-testid="instrument-settings">
      <label htmlFor="instrument-selector">Selected instrument:</label>
      <select
        name="instrument-selector"
        id="instrument-selector"
        onChange={(e) => setInstrument(e.target.value as any)}
      >
        {Object.keys(INSTRUMENT_TUNING_PRESETS).map((value, index) => (
          <option key={index}>
            {value}
          </option>
        ))}
      </select>

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
    </Container>
  );
};
