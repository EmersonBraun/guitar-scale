import { MODES, Modes } from "../constants";
import { CHROMATIC } from "../constants/chromatic";
import { getCurrentNoteIndex, getNoteName } from "./notes";

export const getNoteIndex = (indexOfNote: number) => {
  return CHROMATIC.find(({ index }) => index === indexOfNote);
};

export const getModePattern = (mode: Modes) => {
  return MODES[mode];
};

export const mountMode = ({ mode, currentStringIndex, accidentals }: any) => {
  const modePatthern = getModePattern(mode);
  return modePatthern.map((noteIndex) => {
    const currentNoteIndex = getCurrentNoteIndex({
      noteIndex,
      currentStringIndex,
    });
    return getNoteName({ accidentals, indexOfList: currentNoteIndex });
  });
};


