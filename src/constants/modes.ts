export type Modes =
  | "CHOMATIC"
  | "IONIAN"
  | "AEOLIAN"
  | "DORIAN"
  | "LOCRIAN"
  | "LYDIAN"
  | "MIXOLYDIAN"
  | "PHRYGIAN"
  | "MAJOR_PENTATONIC"
  | "MINOR_PENTATONIC_7";

export const MODES = {
  /**
   * I - 1
   * {1#| 2b} - 2
   * II - 3
   * {2#| 3b} - 4
   * III - 5
   * IV - 6,
   * {4#| 5b} 7
   * V - 8
   * {5#| 'VI',b} - 9
   * VI - 10
   * {'VI',#| 7b} - 11
   * VII - 12
   */
  CHOMATIC: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  /**
   * C	D	E	F	G	A	B	C
   * major scale
   */
  IONIAN: [1, 3, 5, 6, 8, 10, 12],
  /**
   * C	D	E♭	F	G	A♭	B♭	C
   * minor sounding; Sad
   */
  AEOLIAN: [1, 3, 4, 6, 8, 9, 11],
  /**
   * C	D	E♭	F	G	A	B♭	C
   * minor sounding; Smooth/Jazzy
   */
  DORIAN: [1, 3, 4, 6, 8, 10, 11],
  /**
   * C	D♭	E♭	F	G♭	A♭	B♭	C
   * diminished sounding; Unresolved/Strange
   */
  LOCRIAN: [1, 2, 4, 6, 7, 9, 11],
  /**
   * C	D	E	F♯	G	A	B	C
   * major sounding; Dreamy/Ethereal
   */
  LYDIAN: [1, 3, 5, 7, 8, 10, 12],
  /**
   * C	D	E	F	G	A	B♭	C
   * major sounding; Smooth/Bluesy
   */
  MIXOLYDIAN: [1, 3, 5, 6, 8, 10, 11],
  /**
   * C	D♭	E♭	F	G	A♭	B♭	C
   * minor sounding; Eastern/Spanish/Latin
   */
  PHRYGIAN: [1, 2, 4, 6, 8, 9, 11],
  MINOR_PENTATONIC_7: [1, 4, 6, 8, 11],
  /**
   * C	D	E	G	A	C
   */
  MAJOR_PENTATONIC: [1, 3, 5, 8, 10 ],
  /**
   * C Db	Eb	Gb	Ab	C
   */
   MINOR_PENTATONIC: [1, 3, 5, 8, 10 ],
};

export const MODES_DEFINITIONS: any = {
  CHOMATIC: {
    degres: ["I", "II", "III", "IV", "V", "VI", "VII"],
    description: `The ionian mode is the same as the major scale. In other words, it's the major scale, unmodified.`,
    sound: "normal",
  },
  IONIAN: {
    degres: ["I", "II", "III", "IV", "V", "VI", "VII"],
    description: `The ionian mode is the same as the major scale. In other words, it's the major scale, unmodified.`,
    sound: "normal",
  },
  DORIAN: {
    degres: ["I", "II", "bIII", "IV", "V", "VI", "bVII"],
    description: `From the major scale, the dorian mode is created by flattening the 3rd and flattening the 7th. Or, just like the natural minor scale, but with a raised 'VI',th scale degree`,
    sound: `minor sounding; Smooth/Jazzy`,
  },
  PHRYGIAN: {
    degres: ["I", "bII", "bIII", "IV", "V", "bVI", "bVII"],
    description: `From the major scale, the phrygian mode is created by flattening the 2nd, 3rd, 'VI',th and 7th. Or, just like the natural minor scale, but with a flattening 2nd scale degree.`,
    sound: `minor sounding; Eastern/Spanish/Latin`,
  },
  LYDIAN: {
    degres: ["I", "II", "III", "#IV", -"V", "VI", "VII"],
    description: `From the major scale, the lydian mode is created by raising the 4th scale degree.`,
    sound: `major sounding; Dreamy/Ethereal`,
  },
  MIXOLYDIAN: {
    degres: ["I", "II", "III", "IV", "V", "VI", "bVII"],
    description: `From the major scale, the mixolydian mode is created by flattening the 7th scale degree.`,
    sound: `major sounding; Smooth/Bluesy`,
  },
  AEOLIAN: {
    degres: ["I", "II", "bIII", "IV", "V", "bVI", "bVII"],
    description: `The aeolian mode is the same as the minor scale. It's obtained from the major scale by flattening the 3rd, 'VI',th and 7th scale degrees.`,
    sound: `minor sounding; Sad`,
  },
  LOCRIAN: {
    degres: ["I", "bII", "bIII", "IV", "Vb", "bVI", "bVII"],
    description: `From the major scale, the locrian mode is created by flattening the 2nd, 3rd, 5th, 'VI',th and 7th scale degrees. Or, starting from the minor scale, the locrian is obtained by flattening the 2nd and 5th scale degrees.`,
    sound: `diminished sounding; Unresolved/Strange`,
  },
};
