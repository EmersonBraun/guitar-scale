export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export type Note = typeof NOTES[number]

export const SCALE_PATTERNS: Record<string, { name: string; intervals: number[] }> = {
  major: { name: 'Major', intervals: [2, 2, 1, 2, 2, 2, 1] },
  naturalMinor: { name: 'Natural Minor', intervals: [2, 1, 2, 2, 1, 2, 2] },
  harmonicMinor: { name: 'Harmonic Minor', intervals: [2, 1, 2, 2, 1, 3, 1] },
  pentatonicMajor: { name: 'Pentatonic Major', intervals: [2, 2, 3, 2, 3] },
  pentatonicMinor: { name: 'Pentatonic Minor', intervals: [3, 2, 2, 3, 2] },
  blues: { name: 'Blues', intervals: [3, 2, 1, 1, 3, 2] },
  dorian: { name: 'Dorian', intervals: [2, 1, 2, 2, 2, 1, 2] },
  phrygian: { name: 'Phrygian', intervals: [1, 2, 2, 2, 1, 2, 2] },
  lydian: { name: 'Lydian', intervals: [2, 2, 2, 1, 2, 2, 1] },
  mixolydian: { name: 'Mixolydian', intervals: [2, 2, 1, 2, 2, 1, 2] },
  locrian: { name: 'Locrian', intervals: [1, 2, 2, 1, 2, 2, 2] },
}

// Standard guitar tuning: strings from low (6th) to high (1st)
export const STANDARD_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E']

export function getScaleNotes(root: Note, pattern: number[]): Note[] {
  const notes: Note[] = [root]
  let idx = NOTES.indexOf(root)
  for (const interval of pattern.slice(0, -1)) {
    idx = (idx + interval) % 12
    notes.push(NOTES[idx])
  }
  return notes
}

export function getFretNote(openNote: Note, fret: number): Note {
  const idx = (NOTES.indexOf(openNote) + fret) % 12
  return NOTES[idx]
}

export function isScaleNote(openNote: Note, fret: number, scaleNotes: Note[]): boolean {
  return scaleNotes.includes(getFretNote(openNote, fret))
}

export function isRootNote(openNote: Note, fret: number, root: Note): boolean {
  return getFretNote(openNote, fret) === root
}
