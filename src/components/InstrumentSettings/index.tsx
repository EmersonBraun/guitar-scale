import {
  NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField,
  NumberInputStepper, Select
} from "@chakra-ui/react";
import React from "react";
import { INSTRUMENT_TUNING_PRESETS } from "../../constants";
import { useConfig } from "../../context/config";
import { Container } from "./style";

interface instrumentSettingsProps {
  children?: React.ReactNode;
}
export const InstrumentSettings = ({ children }: instrumentSettingsProps) => {
  const { numberOfFrets, setInstrument, setNumberOfFrets } = useConfig();

  return (
    <Container className="settings" data-testid="instrument-settings">
      <Select
        placeholder="Selected instrument:"
        onChange={(e) => setInstrument(e.target.value as any)}
      >
        {Object.keys(INSTRUMENT_TUNING_PRESETS).map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </Select>

      <NumberInput
        defaultValue={numberOfFrets}
        min={5}
        max={30}
        onChange={(valueString) => setNumberOfFrets(+valueString)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Container>
  );
};
