import React, { useEffect, useState } from "react";
import { MODES_DEFINITIONS } from "../../constants";
import { CHROMATIC } from "../../constants/chromatic";
import { useConfig } from "../../context/config";
import { mountMode } from "../../services/modes";
import { Tone } from "../NoteList/style";
import { Container } from "./style";

interface modeListProps {
  children?: React.ReactNode;
}
export const ModeList = ({ children }: modeListProps) => {
  const { accidental, note, mode } = useConfig();
  const [definitions, setDefinitions] = useState(MODES_DEFINITIONS[mode]);

  const mountedMode = () => {
    const currentStringIndex = CHROMATIC.findIndex(
      (notes) => notes[accidental] === note[accidental]
    );
    return mountMode({ mode, currentStringIndex, accidentals: accidental });
  };

  useEffect(() => {
    setDefinitions(MODES_DEFINITIONS[mode]);
  }, [mode]);

  return (
    <Container data-testid="mode-list">
      <div className="note-name-section2">{`Mode: ${mode}`}</div>
      <div className="note-name-section2">{`Sound: ${definitions?.sound}`}</div>
      <div className="note-name-section2">
        {definitions?.degres?.length &&
          definitions?.degres.map((value: string, index: number) => (
            <Tone key={value}>{index > 0 && " - "}{value}</Tone>
          ))}
      </div>
      <div className="note-name-section2">
        {mountedMode()?.length &&
          mountedMode().map((name, index) => (
            <Tone selected={name === note[accidental]} key={name}>
              {index > 0 && " - "}
              {name}
            </Tone>
          ))}
      </div>
    </Container>
  );
};
