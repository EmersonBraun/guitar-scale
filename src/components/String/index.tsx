import React, { useState } from "react";
import { INSTRUMENT_TUNING_PRESETS } from "../../constants";
import { CHROMATIC } from "../../constants/chromatic";
import { NoteInterface, useConfig } from "../../context/config";
import { NoteFret } from "./NoteFret";
import { Container } from "./style";

interface stringProps {
  stringIndex: number;
  singleFretmarks?: number[];
  doubleFretmarks?: number[];
}

export const String = ({
  doubleFretmarks,
  singleFretmarks,
  stringIndex,
}: stringProps) => {
  const { numberOfFrets, accidental, instrument } = useConfig();
  const fretList = Array.from({ length: numberOfFrets }, (_, i) => i + 1);
  const [index, setIndex] = useState(INSTRUMENT_TUNING_PRESETS[instrument][stringIndex-1])

  const stringTone = () => {
    return (
      <select defaultValue={index} onChange={(e) => setIndex(+e.target.value)} placeholder="tone" style={{color: "black", zIndex: 3}}>
        {CHROMATIC.map((notes: NoteInterface, index) => (
          <option key={index} value={index}>{notes[accidental]}</option>
        ))}
      </select>
    )
  }

  return (
    <Container className="string" data-testid="string">
      {stringTone()}
      {fretList.length &&
        fretList.map((noteIndex) => (
          noteIndex > 1 ? <NoteFret
            key={noteIndex}
            noteIndex={noteIndex}
            stringIndex={index}
            doubleFretmark={doubleFretmarks?.includes(noteIndex-1) ?? false}
            singleFretmark={singleFretmarks?.includes(noteIndex-1) ?? false}
          /> : <></>
        ))}
    </Container>
  );
};
