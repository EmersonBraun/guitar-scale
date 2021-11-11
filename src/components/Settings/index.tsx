import React from "react";
import { MODES } from "../../constants";
import { useConfig } from "../../context/config";
import { Container } from "./style";

interface settingsProps {
  children?: React.ReactNode;
}

export const Settings = ({ children }: settingsProps) => {
  const { accidental, setAccidental, setMode } = useConfig();

  return (
    <Container className="settings" data-testid="settings">
      <div className="accidental-selector">
        <input
          type="radio"
          className="acc-select"
          name="accidentals"
          value={accidental}
          onChange={() => setAccidental("flats")}
          checked={accidental === "flats"}
        />
        <label htmlFor="flats">♭</label>
        <input
          type="radio"
          className="acc-select"
          name="accidentals"
          value={accidental}
          onChange={() => setAccidental("sharps")}
          checked={accidental === "sharps"}
        />
        <label htmlFor="sharps">♯</label>
      </div>

      <label htmlFor="mode">Selected mode:</label>
      <select name="mode" id="mode" onChange={(e) => setMode(e.target.value)}>
        {Object.keys(MODES).map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>
    </Container>
  );
};
