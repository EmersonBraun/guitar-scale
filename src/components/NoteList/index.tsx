import React from "react";
import { CHROMATIC } from "../../constants/chromatic";
import { useConfig } from "../../context/config";
import { mountMode } from "../../services/modes";
import { Container } from "./style";

interface noteListProps {
  children?: React.ReactNode;
}
export const NoteList = ({ children }: noteListProps) => {
  const { accidental, mode, note } = useConfig();
  const mountedMode = () => {
    const currentStringIndex = CHROMATIC.findIndex(
      ({ flats, sharps }) => flats === note || sharps === note
    );
    return mountMode({ mode, currentStringIndex, accidentals:accidental });
  };

  return (
    <Container className="note-name-section" data-testid="note-list">
      {mountedMode()?.length &&
        mountedMode().map((name) => <span key={name}>{name}</span>)}
    </Container>
  );
};
