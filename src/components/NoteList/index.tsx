import React from "react";
import { CHROMATIC } from "../../constants/chromatic";
// import { CHROMATIC } from "../../constants/chromatic";
import { NoteInterface, useConfig } from "../../context/config";
// import { mountMode } from "../../services/modes";
import { Container, NoteCircle } from "./style";

interface noteListProps {
  children?: React.ReactNode;
}
export const NoteList = ({ children }: noteListProps) => {
  const { accidental, note, setNote, setNoteHover } = useConfig();

  return (
    <Container className="note-name-section" data-testid="note-list">
      {CHROMATIC.map((notes: NoteInterface, index) => (
        <NoteCircle
          key={index}
          onClick={() => setNote(notes)}
          onMouseEnter={() => setNoteHover(notes)}
          onMouseLeave={() => setNoteHover(undefined)}
          selected={notes[accidental] === note[accidental]}
        >
          {notes[accidental]}
        </NoteCircle>
      ))}
    </Container>
  );
};
