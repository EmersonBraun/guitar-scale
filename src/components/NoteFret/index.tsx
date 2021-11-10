import React, { useCallback } from "react";
import { CHROMATIC } from "../../constants/chromatic";
import { NoteInterface, useConfig } from "../../context/config";
import { mountMode } from "../../services/modes";
import { getNoteByIndex } from "../../services/notes";
import { Note } from "../Note";
import { Container } from "./style";

interface noteFretProps {
  singleFretmark?: boolean;
  doubleFretmark?: boolean;
  noteIndex: number;
  stringIndex: number;
}

export const NoteFret = ({
  singleFretmark,
  doubleFretmark,
  noteIndex,
  stringIndex,
}: noteFretProps) => {
  const { accidental, instrument, mode, note } = useConfig();

  const generateNoteNames = useCallback(
    ({ noteIndex, stringIndex, accidentals }: any) => {
      return getNoteByIndex({
        noteIndex,
        stringIndex,
        accidentals,
        instrumentName: instrument,
      });
    },
    [instrument]
  );

  const noteName: any = generateNoteNames({
    noteIndex,
    stringIndex,
    accidentals: accidental,
  });

  const currentIndex = CHROMATIC.find(
    (notes: NoteInterface) => notes[accidental] === note[accidental]
  );

  const noteInMode = (noteName: string) => {
    const currentStringIndex = CHROMATIC.findIndex(
      (notes) => notes[accidental] === note[accidental]
    );
    const mountedMode = mountMode({ mode, currentStringIndex, accidentals: accidental });
    return mountedMode.includes(noteName);
  };

  return (
    <Container
      className={`note-fret ${singleFretmark && "single-fretmark"}`}
      data-testid="note-fret"
    >
      {noteInMode(noteName) && (
        <Note
          name={noteName}
          selected={[currentIndex?.flats, currentIndex?.sharps].includes(
            noteName
          )}
        />
      )}
      {doubleFretmark && <div className="double-fretmark"></div>}
    </Container>
  );
};
