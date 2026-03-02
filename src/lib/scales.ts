export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export type Note = typeof NOTES[number]

// Enharmonic flat equivalents
export const FLAT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const
export type FlatNote = typeof FLAT_NOTES[number]

export const SCALE_PATTERNS: Record<string, { name: string; intervals: number[]; characteristic?: number }> = {
  major: { name: 'Major', intervals: [2, 2, 1, 2, 2, 2, 1] },
  naturalMinor: { name: 'Natural Minor', intervals: [2, 1, 2, 2, 1, 2, 2] },
  harmonicMinor: { name: 'Harmonic Minor', intervals: [2, 1, 2, 2, 1, 3, 1], characteristic: 6 },
  pentatonicMajor: { name: 'Pentatonic Major', intervals: [2, 2, 3, 2, 3] },
  pentatonicMinor: { name: 'Pentatonic Minor', intervals: [3, 2, 2, 3, 2] },
  blues: { name: 'Blues', intervals: [3, 2, 1, 1, 3, 2], characteristic: 3 },
  dorian: { name: 'Dorian', intervals: [2, 1, 2, 2, 2, 1, 2], characteristic: 5 },
  phrygian: { name: 'Phrygian', intervals: [1, 2, 2, 2, 1, 2, 2], characteristic: 1 },
  lydian: { name: 'Lydian', intervals: [2, 2, 2, 1, 2, 2, 1], characteristic: 3 },
  mixolydian: { name: 'Mixolydian', intervals: [2, 2, 1, 2, 2, 1, 2], characteristic: 6 },
  locrian: { name: 'Locrian', intervals: [1, 2, 2, 1, 2, 2, 2], characteristic: 4 },
  // Exotic/world scales
  hungarianMinor: { name: 'Hungarian Minor', intervals: [2, 1, 3, 1, 1, 3, 1], characteristic: 3 },
  wholeTone: { name: 'Whole Tone', intervals: [2, 2, 2, 2, 2, 2] },
  diminished: { name: 'Diminished', intervals: [2, 1, 2, 1, 2, 1, 2, 1] },
  augmented: { name: 'Augmented', intervals: [3, 1, 3, 1, 3, 1] },
  japanese: { name: 'Japanese (In)', intervals: [1, 4, 2, 1, 4] },
  arabian: { name: 'Arabian', intervals: [2, 2, 1, 1, 2, 2, 2] },
  persian: { name: 'Persian', intervals: [1, 3, 1, 1, 2, 3, 1], characteristic: 1 },
  byzantine: { name: 'Byzantine', intervals: [1, 3, 1, 2, 1, 3, 1], characteristic: 1 },
}

// Scale degree labels for each scale
export const SCALE_DEGREES: Record<string, string[]> = {
  major: ['1', '2', '3', '4', '5', '6', '7'],
  naturalMinor: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
  harmonicMinor: ['1', '2', 'b3', '4', '5', 'b6', '7'],
  pentatonicMajor: ['1', '2', '3', '5', '6'],
  pentatonicMinor: ['1', 'b3', '4', '5', 'b7'],
  blues: ['1', 'b3', '4', 'b5', '5', 'b7'],
  dorian: ['1', '2', 'b3', '4', '5', '6', 'b7'],
  phrygian: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
  lydian: ['1', '2', '3', '#4', '5', '6', '7'],
  mixolydian: ['1', '2', '3', '4', '5', '6', 'b7'],
  locrian: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
  hungarianMinor: ['1', '2', 'b3', '#4', '5', 'b6', '7'],
  wholeTone: ['1', '2', '3', '#4', '#5', 'b7'],
  diminished: ['1', '2', 'b3', '4', 'b5', 'b6', '6', '7'],
  augmented: ['1', 'b3', '3', '5', '#5', '7'],
  japanese: ['1', 'b2', '4', '5', 'b6'],
  arabian: ['1', '2', '3', '4', 'b5', 'b6', 'b7'],
  persian: ['1', 'b2', '3', '4', 'b5', 'b6', '7'],
  byzantine: ['1', 'b2', '3', '4', '5', 'b6', '7'],
}

// Mode relationships
export const MODE_RELATIONSHIPS: { parent: string; modes: { key: string; degree: number }[] }[] = [
  {
    parent: 'Major',
    modes: [
      { key: 'major', degree: 1 },
      { key: 'dorian', degree: 2 },
      { key: 'phrygian', degree: 3 },
      { key: 'lydian', degree: 4 },
      { key: 'mixolydian', degree: 5 },
      { key: 'naturalMinor', degree: 6 },
      { key: 'locrian', degree: 7 },
    ],
  },
]

// Tuning definitions
export interface Tuning {
  name: string
  notes: Note[]
  strings: number
  instrument: string
}

export const TUNINGS: Record<string, Tuning> = {
  // Guitar 6-string
  standard: { name: 'Standard', notes: ['E', 'A', 'D', 'G', 'B', 'E'], strings: 6, instrument: 'Guitar (6-string)' },
  dropD: { name: 'Drop D', notes: ['D', 'A', 'D', 'G', 'B', 'E'], strings: 6, instrument: 'Guitar (6-string)' },
  dropC: { name: 'Drop C', notes: ['C', 'G', 'C', 'F', 'A', 'D'], strings: 6, instrument: 'Guitar (6-string)' },
  dropB: { name: 'Drop B', notes: ['B', 'F#', 'B', 'E', 'G#', 'C#'], strings: 6, instrument: 'Guitar (6-string)' },
  openG: { name: 'Open G', notes: ['D', 'G', 'D', 'G', 'B', 'D'], strings: 6, instrument: 'Guitar (6-string)' },
  openD: { name: 'Open D', notes: ['D', 'A', 'D', 'F#', 'A', 'D'], strings: 6, instrument: 'Guitar (6-string)' },
  openE: { name: 'Open E', notes: ['E', 'B', 'E', 'G#', 'B', 'E'], strings: 6, instrument: 'Guitar (6-string)' },
  openA: { name: 'Open A', notes: ['E', 'A', 'E', 'A', 'C#', 'E'], strings: 6, instrument: 'Guitar (6-string)' },
  openC: { name: 'Open C', notes: ['C', 'G', 'C', 'G', 'C', 'E'], strings: 6, instrument: 'Guitar (6-string)' },
  dadgad: { name: 'DADGAD', notes: ['D', 'A', 'D', 'G', 'A', 'D'], strings: 6, instrument: 'Guitar (6-string)' },
  halfStepDown: { name: 'Half Step Down (Eb)', notes: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'], strings: 6, instrument: 'Guitar (6-string)' },
  fullStepDown: { name: 'Full Step Down (D)', notes: ['D', 'G', 'C', 'F', 'A', 'D'], strings: 6, instrument: 'Guitar (6-string)' },
  nashville: { name: 'Nashville', notes: ['E', 'A', 'D', 'G', 'B', 'E'], strings: 6, instrument: 'Guitar (6-string)' },
  // Guitar 7-string
  standard7: { name: 'Standard 7-String', notes: ['B', 'E', 'A', 'D', 'G', 'B', 'E'], strings: 7, instrument: 'Guitar (7-string)' },
  dropA7: { name: 'Drop A 7-String', notes: ['A', 'E', 'A', 'D', 'G', 'B', 'E'], strings: 7, instrument: 'Guitar (7-string)' },
  // Guitar 8-string
  standard8: { name: 'Standard 8-String', notes: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'], strings: 8, instrument: 'Guitar (8-string)' },
  dropE8: { name: 'Drop E 8-String', notes: ['E', 'B', 'E', 'A', 'D', 'G', 'B', 'E'], strings: 8, instrument: 'Guitar (8-string)' },
  // Bass 4-string
  bass4: { name: 'Standard', notes: ['E', 'A', 'D', 'G'], strings: 4, instrument: 'Bass (4-string)' },
  bass4DropD: { name: 'Drop D', notes: ['D', 'A', 'D', 'G'], strings: 4, instrument: 'Bass (4-string)' },
  bass4HalfDown: { name: 'Half Step Down', notes: ['D#', 'G#', 'C#', 'F#'], strings: 4, instrument: 'Bass (4-string)' },
  // Bass 5-string
  bass5: { name: 'Standard 5-String', notes: ['B', 'E', 'A', 'D', 'G'], strings: 5, instrument: 'Bass (5-string)' },
  bass5DropA: { name: 'Drop A 5-String', notes: ['A', 'E', 'A', 'D', 'G'], strings: 5, instrument: 'Bass (5-string)' },
  // Bass 6-string
  bass6: { name: 'Standard 6-String', notes: ['B', 'E', 'A', 'D', 'G', 'C'], strings: 6, instrument: 'Bass (6-string)' },
  // Ukulele
  ukulele: { name: 'Standard (GCEA)', notes: ['G', 'C', 'E', 'A'], strings: 4, instrument: 'Ukulele' },
  ukuleleBaritone: { name: 'Baritone (DGBE)', notes: ['D', 'G', 'B', 'E'], strings: 4, instrument: 'Ukulele' },
  ukuleleSlack: { name: 'Slack-key (GCEG)', notes: ['G', 'C', 'E', 'G'], strings: 4, instrument: 'Ukulele' },
  // Banjo 5-string
  banjoOpenG: { name: 'Open G', notes: ['G', 'D', 'G', 'B', 'D'], strings: 5, instrument: 'Banjo (5-string)' },
  banjoOpenD: { name: 'Open D', notes: ['F#', 'D', 'F#', 'A', 'D'], strings: 5, instrument: 'Banjo (5-string)' },
  banjoDoubleC: { name: 'Double C', notes: ['G', 'C', 'G', 'C', 'D'], strings: 5, instrument: 'Banjo (5-string)' },
  banjoSawmill: { name: 'Sawmill (G Modal)', notes: ['G', 'D', 'G', 'C', 'D'], strings: 5, instrument: 'Banjo (5-string)' },
  // Banjo 4-string (Tenor/Plectrum)
  banjoTenor: { name: 'Tenor (CGDA)', notes: ['C', 'G', 'D', 'A'], strings: 4, instrument: 'Banjo (4-string)' },
  banjoPlectrum: { name: 'Plectrum (CGBD)', notes: ['C', 'G', 'B', 'D'], strings: 4, instrument: 'Banjo (4-string)' },
  // Mandolin
  mandolin: { name: 'Standard (GDAE)', notes: ['G', 'D', 'A', 'E'], strings: 4, instrument: 'Mandolin' },
  mandolinOpenG: { name: 'Open G (GDGB)', notes: ['G', 'D', 'G', 'B'], strings: 4, instrument: 'Mandolin' },
  // Violin / Fiddle
  violin: { name: 'Standard (GDAE)', notes: ['G', 'D', 'A', 'E'], strings: 4, instrument: 'Violin / Fiddle' },
  // Viola
  viola: { name: 'Standard (CGDA)', notes: ['C', 'G', 'D', 'A'], strings: 4, instrument: 'Viola' },
  // Cello
  cello: { name: 'Standard (CGDA)', notes: ['C', 'G', 'D', 'A'], strings: 4, instrument: 'Cello' },
  // Cavaquinho
  cavaquinho: { name: 'Standard (DGBD)', notes: ['D', 'G', 'B', 'D'], strings: 4, instrument: 'Cavaquinho' },
  cavaquinhoMachete: { name: 'Machete (DGBE)', notes: ['D', 'G', 'B', 'E'], strings: 4, instrument: 'Cavaquinho' },
  // Charango
  charango: { name: 'Standard', notes: ['G', 'C', 'E', 'A', 'E'], strings: 5, instrument: 'Charango' },
  // Bouzouki
  bouzouki: { name: 'Irish (GDAD)', notes: ['G', 'D', 'A', 'D'], strings: 4, instrument: 'Bouzouki' },
  // Cigar Box Guitar
  cigarBox3: { name: '3-String (GDG)', notes: ['G', 'D', 'G'], strings: 3, instrument: 'Cigar Box Guitar' },
  cigarBox4: { name: '4-String (DGBD)', notes: ['D', 'G', 'B', 'D'], strings: 4, instrument: 'Cigar Box Guitar' },
  // Lap Steel
  lapSteelC6: { name: 'C6', notes: ['C', 'E', 'G', 'A', 'C', 'E'], strings: 6, instrument: 'Lap Steel' },
  lapSteelOpenD: { name: 'Open D', notes: ['D', 'A', 'D', 'F#', 'A', 'D'], strings: 6, instrument: 'Lap Steel' },
}

// Diatonic chords for major scale (pattern applies via transposition)
export const DIATONIC_CHORD_QUALITIES = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'] as const
export type ChordQuality = typeof DIATONIC_CHORD_QUALITIES[number]

// Common chord shapes (fret offsets relative to root, -1 = muted)
export interface ChordShape {
  name: string
  quality: ChordQuality
  frets: number[] // fret positions for 6 strings (-1 = muted, 0 = open)
}

// CAGED box patterns for pentatonic minor (fret offsets relative to root)
export const CAGED_PATTERNS: { name: string; color: string; frets: { string: number; fret: number }[] }[] = [
  {
    name: 'Pattern 1 (E shape)',
    color: '#ef4444',
    frets: [
      { string: 5, fret: 0 }, { string: 5, fret: 3 },
      { string: 4, fret: 0 }, { string: 4, fret: 2 },
      { string: 3, fret: 0 }, { string: 3, fret: 2 },
      { string: 2, fret: 0 }, { string: 2, fret: 2 },
      { string: 1, fret: 0 }, { string: 1, fret: 3 },
      { string: 0, fret: 0 }, { string: 0, fret: 3 },
    ],
  },
  {
    name: 'Pattern 2 (D shape)',
    color: '#f97316',
    frets: [
      { string: 5, fret: 3 }, { string: 5, fret: 5 },
      { string: 4, fret: 2 }, { string: 4, fret: 5 },
      { string: 3, fret: 2 }, { string: 3, fret: 4 },
      { string: 2, fret: 2 }, { string: 2, fret: 5 },
      { string: 1, fret: 3 }, { string: 1, fret: 5 },
      { string: 0, fret: 3 }, { string: 0, fret: 5 },
    ],
  },
  {
    name: 'Pattern 3 (C shape)',
    color: '#eab308',
    frets: [
      { string: 5, fret: 5 }, { string: 5, fret: 7 },
      { string: 4, fret: 5 }, { string: 4, fret: 7 },
      { string: 3, fret: 4 }, { string: 3, fret: 7 },
      { string: 2, fret: 5 }, { string: 2, fret: 7 },
      { string: 1, fret: 5 }, { string: 1, fret: 8 },
      { string: 0, fret: 5 }, { string: 0, fret: 7 },
    ],
  },
  {
    name: 'Pattern 4 (A shape)',
    color: '#22c55e',
    frets: [
      { string: 5, fret: 7 }, { string: 5, fret: 10 },
      { string: 4, fret: 7 }, { string: 4, fret: 9 },
      { string: 3, fret: 7 }, { string: 3, fret: 9 },
      { string: 2, fret: 7 }, { string: 2, fret: 10 },
      { string: 1, fret: 8 }, { string: 1, fret: 10 },
      { string: 0, fret: 7 }, { string: 0, fret: 10 },
    ],
  },
  {
    name: 'Pattern 5 (G shape)',
    color: '#3b82f6',
    frets: [
      { string: 5, fret: 10 }, { string: 5, fret: 12 },
      { string: 4, fret: 9 }, { string: 4, fret: 12 },
      { string: 3, fret: 9 }, { string: 3, fret: 12 },
      { string: 2, fret: 10 }, { string: 2, fret: 12 },
      { string: 1, fret: 10 }, { string: 1, fret: 12 },
      { string: 0, fret: 10 }, { string: 0, fret: 12 },
    ],
  },
]

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

export function getNoteDisplay(note: Note, useFlats: boolean): string {
  if (!useFlats) return note
  const idx = NOTES.indexOf(note)
  return FLAT_NOTES[idx]
}

export function isScaleNote(openNote: Note, fret: number, scaleNotes: Note[]): boolean {
  return scaleNotes.includes(getFretNote(openNote, fret))
}

export function isRootNote(openNote: Note, fret: number, root: Note): boolean {
  return getFretNote(openNote, fret) === root
}

export function getScaleDegree(note: Note, scaleNotes: Note[], scaleKey: string): string | null {
  const degrees = SCALE_DEGREES[scaleKey]
  if (!degrees) return null
  const idx = scaleNotes.indexOf(note)
  if (idx === -1) return null
  return degrees[idx]
}

export function isCharacteristicNote(note: Note, scaleNotes: Note[], scaleKey: string): boolean {
  const pattern = SCALE_PATTERNS[scaleKey]
  if (!pattern?.characteristic) return false
  return scaleNotes[pattern.characteristic] === note
}

// Generate diatonic chords from a scale
export function getDiatonicChords(root: Note, scaleKey: string): { note: Note; quality: ChordQuality; numeral: string }[] {
  const pattern = SCALE_PATTERNS[scaleKey]
  if (!pattern) return []
  const scaleNotes = getScaleNotes(root, pattern.intervals)
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
  const qualities = DIATONIC_CHORD_QUALITIES

  return scaleNotes.map((note, i) => {
    const quality = qualities[i % qualities.length]
    let numeral = numerals[i] || `${i + 1}`
    if (quality === 'min') numeral = numeral.toLowerCase()
    if (quality === 'dim') numeral = numeral.toLowerCase() + '°'
    return { note, quality, numeral }
  })
}

// Audio: frequency calculation
export function getNoteFrequency(note: Note, octave: number): number {
  const A4 = 440
  const semitones = NOTES.indexOf(note) - NOTES.indexOf('A')
  const octaveDiff = octave - 4
  return A4 * Math.pow(2, octaveDiff + semitones / 12)
}

// Get guitar string octave + fret octave
export function getFretFrequency(stringIndex: number, fret: number, tuning: Note[]): number {
  // Base octaves for standard tuning (low to high): E2, A2, D3, G3, B3, E4
  const baseOctaves = [2, 2, 3, 3, 3, 4]
  // Adjust for different tunings / string counts
  const octave = baseOctaves[stringIndex] ?? 3
  const note = getFretNote(tuning[stringIndex], fret)
  const baseSemitone = NOTES.indexOf(tuning[stringIndex]) + octave * 12
  const fretSemitone = baseSemitone + fret
  const finalOctave = Math.floor(fretSemitone / 12)
  return getNoteFrequency(note, finalOctave)
}

// URL slug utilities
export function scaleKeyToSlug(key: string): string {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function slugToScaleKey(slug: string): string | null {
  const key = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  return SCALE_PATTERNS[key] ? key : null
}

export function noteToSlug(note: Note): string {
  return note.replace('#', 'sharp')
}

export function slugToNote(slug: string): Note | null {
  const note = slug.replace('sharp', '#') as Note
  return NOTES.includes(note) ? note : null
}
