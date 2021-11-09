import { NOTES_FLAT, NOTES_SHARP } from "../constants";
import { getInstrumentPreset, Instruments } from "./instruments";

interface GetNoteByIndex {
  noteIndex: number;
  stringIndex: number;
  accidentals: "flats" | "sharps";
  instrumentName: Instruments;
}

interface GetCurrentStringIndex {
  stringIndex: number;
  instrumentName: Instruments;
}

interface GetNoteName {
  indexOfList: number;
  accidentals: "flats" | "sharps";
}

interface GetCurrentNoteIndex {
  noteIndex: number;
  currentStringIndex: number;
}

export const getCurrentStringIndex = ({
  stringIndex,
  instrumentName,
}: GetCurrentStringIndex) => {
  const instrument = getInstrumentPreset({ name: instrumentName });
  return instrument[stringIndex - 1];
};

export const getCurrentNoteIndex = ({
  noteIndex,
  currentStringIndex,
}: GetCurrentNoteIndex) => {
  return (noteIndex - 1 + currentStringIndex) % 12;
};

export const getNoteName = ({ accidentals, indexOfList }: GetNoteName) => {
  if (accidentals === "flats") {
    return NOTES_FLAT[indexOfList];
  }
  return NOTES_SHARP[indexOfList];
};

export const getNoteByIndex = ({
  noteIndex,
  stringIndex,
  accidentals,
  instrumentName = "Guitar",
}: GetNoteByIndex) => {
  const currentStringIndex = getCurrentStringIndex({
    stringIndex,
    instrumentName,
  });
  const currentNoteIndex = getCurrentNoteIndex({
    noteIndex,
    currentStringIndex,
  });
  return getNoteName({ accidentals, indexOfList: currentNoteIndex });
};
