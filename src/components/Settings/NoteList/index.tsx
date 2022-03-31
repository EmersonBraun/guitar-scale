import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { CHROMATIC } from "../../../constants/chromatic";
import { NoteInterface, useConfig } from "../../../context/config";
import { Container } from "./style";

interface noteListProps {
  children?: React.ReactNode;
}
export const NoteList = ({ children }: noteListProps) => {
  const { accidental, note, setNote } = useConfig();

  const handleNote = useCallback(
    (type = "next") => {
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
    },
    [note, setNote]
  );

  return (
    <Container className="settings" data-testid="note-list">
      <ButtonGroup variant="outline">
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => handleNote("prev")}
      >
        -
      </Button>
        {CHROMATIC.map((notes: NoteInterface, index) => (
          <Button
            key={index}
            colorScheme="teal"
            variant={
              notes[accidental] === note[accidental] ? "solid" : "outline"
            }
            onClick={() => setNote(notes)}
          >
            {notes[accidental]}
          </Button>
        ))}
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => handleNote("next")}
        >
          +
        </Button>
      </ButtonGroup>
    </Container>
  );
};
