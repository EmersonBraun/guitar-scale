import React from "react";
import { MODES } from "../../constants";
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
  const { mode, accidental, setAccidental, setMode } = useConfig();

  return (
    <Container className="settings" data-testid="settings">
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

      <label htmlFor="mode">Selected mode:</label>
      <select name="mode" id="mode" onChange={(e) => setMode(e.target.value)}>
        {Object.keys(MODES).map((value, index) => (
          <option selected={value === mode} key={index}>
            {value}
          </option>
        ))}
      </select>
    </Container>
  );
};
