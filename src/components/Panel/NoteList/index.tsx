import React, { useCallback } from "react";
import { CHROMATIC } from "../../../constants/chromatic";
// import { CHROMATIC } from "../../constants/chromatic";
import { NoteInterface, useConfig } from "../../../context/config";
// import { mountMode } from "../../services/modes";
import { Container, Tone } from "./style";

interface noteListProps {
  children?: React.ReactNode;
}
export const NoteList = ({ children }: noteListProps) => {
  const { accidental, note, setNote } = useConfig();

  const handleNote = useCallback((type = "next") => {
    const currentNoteIndex = note.index;
    let newIndex = 0;
    if (type === "next") {
      newIndex =
        currentNoteIndex === CHROMATIC.length ? 1 : currentNoteIndex + 1;
    } else {
      newIndex =
        currentNoteIndex === 1 ? CHROMATIC.length : currentNoteIndex - 1;
    }
    const newNote = CHROMATIC.find((value) => value.index === newIndex);
    if (newNote) setNote(newNote);
  }, [note, setNote]);

  return (
    <Container className="note-name-section" data-testid="note-list">
      <Tone weight={400} selected onClick={() => handleNote("prev")}>
        -
      </Tone>
      {CHROMATIC.map((notes: NoteInterface, index) => (
        <Tone
          key={index}
          onClick={() => setNote(notes)}
          selected={notes[accidental] === note[accidental]}
        >
          {notes[accidental]}
        </Tone>
      ))}
      <Tone weight={400} selected onClick={() => handleNote("next")}>
        +
      </Tone>
    </Container>
  );
};
