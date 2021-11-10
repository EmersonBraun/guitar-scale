import React, { useEffect, useState } from "react";
import {
  DEFAULT_DOUBLE_FRETMARKS,
  DEFAULT_SINGLE_FRETMARKS,
  INSTRUMENT_TUNING_PRESETS
} from "../../constants";
import { useConfig } from "../../context/config";
import { String } from "../String";
import { Container } from "./style";

export const Instrument = () => {
  const [length, setLength] = useState(6);
  const { numberOfFrets, instrument } = useConfig();

  useEffect(() => {
    const intrumentPreset = INSTRUMENT_TUNING_PRESETS[instrument];
    setLength(intrumentPreset.length);
  }, [instrument]);

  const stringList = Array.from({ length }, (_, i) => i + 1);
  return (
    <Container className="fretboard" data-testid="instrument">
      {stringList.length &&
        stringList.map((key) =>
          key === 1 ? (
            <String
              key={key}
              stringIndex={key}
              frets={numberOfFrets}
              doubleFretmarks={DEFAULT_DOUBLE_FRETMARKS}
              singleFretmarks={DEFAULT_SINGLE_FRETMARKS}
            />
          ) : (
            <String key={key} stringIndex={key} frets={numberOfFrets} />
          )
        )}
    </Container>
  );
};
