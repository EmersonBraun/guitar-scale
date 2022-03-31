import { Button, ButtonGroup, Select } from "@chakra-ui/react";
import React from "react";
import { MODES } from "../../../constants";
import { useConfig } from "../../../context/config";
import { Container } from "./style";


interface modeSettingsProps {
  children?: React.ReactNode;
}

export const ModeSettings = ({ children }: modeSettingsProps) => {
  const { accidental, mode, setAccidental, setMode } = useConfig();

  return (
    <Container className="settings" data-testid="modeSettings">
      <ButtonGroup variant="outline" >
        <Button colorScheme="teal" variant={accidental === "flats" ? 'solid' : 'outline'} onClick={() => setAccidental("flats")}>♭</Button>
        <Button colorScheme="teal" variant={accidental === "sharps" ? 'solid' : 'outline'} onClick={() => setAccidental("sharps")}>♯</Button>
      </ButtonGroup>

      <Select
        placeholder="Selected mode:"
        defaultValue={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        {Object.keys(MODES).map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </Select>
    </Container>
  );
};
