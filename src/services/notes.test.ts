import { getCurrentNoteIndex, getCurrentStringIndex, getNoteByIndex } from "./notes";

describe("Notes service", () => {
  it("getCurrentStringIndex", () => {
    const currentStringIndex = getCurrentStringIndex({
      stringIndex: 1,
      instrumentName: "Guitar (6 strings)",
    });
    expect(currentStringIndex).toBe(4);
  });
  it("getCurrentNoteIndex", () => {
    const currentNoteIndex = getCurrentNoteIndex({
      noteIndex: 1,
      currentStringIndex: 1
    });
    expect(currentNoteIndex).toBe(1);
  });
  it("getNoteByIndex", () => {
    const note = getNoteByIndex({
        noteIndex: 1,
        stringIndex: 1,
        accidentals: 'flats',
        instrumentName: "Guitar (6 strings)",
    });
    expect(note).toBe('E');
  });
});
