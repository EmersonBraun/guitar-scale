export type Modes = 'CHOMATIC'| "IONIAN" | 'AEOLIAN'| 'DORIAN' | 'LOCRIAN' | 'LYDIAN' | 'MIXOLYDIAN' | 'PHRYGIAN';

export const MODES = {
  /**
   * I - 1
   * {1#| 2b} - 2
   * II - 3
   * {2#| 3b} - 4
   * III - 5
   * IV - 6
   * {4#| 5b} - 7
   * V - 8
   * {5#| 6b} - 9
   * VI - 10
   * {6#| 7b} - 11
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
};
