import { Button, ButtonGroup, Select } from "@chakra-ui/react";
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
      <ButtonGroup variant="outline" >
        <Button colorScheme="teal" variant={accidental === "flats" ? 'solid' : 'outline'} onClick={() => setAccidental("flats")}>♭</Button>
        <Button colorScheme="teal" variant={accidental === "sharps" ? 'solid' : 'outline'} onClick={() => setAccidental("sharps")}>♯</Button>
      </ButtonGroup>

      <Select
        placeholder="Selected instrument:"
        onChange={(e) => setMode(e.target.value)}
      >
        {Object.keys(MODES).map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </Select>
    </Container>
  );
};
