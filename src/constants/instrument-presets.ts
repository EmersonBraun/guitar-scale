/**
 * 0-C
 * 1-C#
 * 2-D
 * 3-D#
 * 4-E
 * 5-F
 * 6-F#
 * 7-G
 * 8-G#
 * 9-A
 * 10-A#
 * 11-B
 */
export const guitar6strings = [4, 11, 7, 2, 9, 4]; // E B G D A E
export const guitar7strings = [4, 11, 7, 2, 9, 4, 11]; // E B G D A E B
export const bass4strings = [7, 2, 9, 4]; // G D A E
export const bass5strings = [7, 2, 9, 4, 11]; // G D A E B
// export const banjo4strings = [7, 2, 9, 4, 11] // A D G C
export const banjo5strings = [2, 11, 7, 2, 7]; // D B G D G
export const ukuleleSoprano = [9, 4, 0, 7]; // A E C G
export const ukuleleBaritone = [2, 7, 11, 4]; // D G B E

export const INSTRUMENT_TUNING_PRESETS = {
  "Guitar (6 strings)": guitar6strings,
  "Guitar (7 strings)": guitar7strings,
  "Bass (4 strings)": bass4strings,
  "Bass (5 strings)": bass5strings,
  "Banjo (5 strings)": banjo5strings,
  "Ukulele (Soprano)": ukuleleSoprano,
  "Ukulele (Baritone)": ukuleleBaritone,
};
