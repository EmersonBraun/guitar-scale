import React from "react";
import { useConfig } from "../../context/config";
import { NoteFret } from "../NoteFret";
import { Container } from "./style";

interface stringProps {
  frets: number;
  stringIndex: number;
  singleFretmarks?: number[];
  doubleFretmarks?: number[];
}

export const String = ({
  frets,
  doubleFretmarks,
  singleFretmarks,
  stringIndex,
}: stringProps) => {
  const { numberOfFrets } = useConfig();
  const fretList = Array.from({ length: numberOfFrets }, (_, i) => i + 1);

  return (
    <Container className="string" data-testid="string">
      {fretList.length &&
        fretList.map((noteIndex) => (
          <NoteFret
            key={noteIndex}
            noteIndex={noteIndex}
            stringIndex={stringIndex}
            doubleFretmark={doubleFretmarks?.includes(noteIndex) ?? false}
            singleFretmark={singleFretmarks?.includes(noteIndex) ?? false}
          />
        ))}
    </Container>
  );
};
