import React, { useEffect, useState } from "react";
import { MODES_DEFINITIONS } from "../../constants";
import { CHROMATIC } from "../../constants/chromatic";
import { useConfig } from "../../context/config";
import { mountMode } from "../../services/modes";
import { NoteCircle } from "../NoteList/style";
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
      {/* <div>{definitions?.description}</div>
      <div>{definitions?.sound}</div> */}
      <div className="note-name-section2">
        {definitions?.degres?.length &&
          definitions?.degres.map((value: string) => (
            <span key={value}>{value}</span>
          ))}
      </div>
      <div className="note-name-section2">
        {mountedMode()?.length &&
          mountedMode().map((name, index) => (
            <NoteCircle selected={name === note[accidental]} key={name}>
              {index > 0 && " - "}
              {name}
            </NoteCircle>
          ))}
      </div>
    </Container>
  );
};
