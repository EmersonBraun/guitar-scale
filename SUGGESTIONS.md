# Guitar Scale Viewer — App Concept & Roadmap

## Why This App Matters
The Guitar Scale Viewer helps musicians visualize musical scales on the fretboard.
Most guitarists learn scales visually — this app makes scale discovery instant.

## Current Features (v0.2.0 — Next.js rewrite)
- 11 scale types: Major, Natural Minor, Harmonic Minor, Pentatonic (Major/Minor), Blues, Dorian, Phrygian, Lydian, Mixolydian, Locrian
- All 12 root notes (chromatic)
- 6-string standard tuning, 13 frets
- Root note distinctive styling (gold)
- Scale note display with optional note name labels
- Scale notes listed below controls

## Phase 1 — Core Improvements
- [ ] Multiple tunings: Drop D, Open G, DADGAD, Bass (4-string), Ukulele GCEA
- [ ] URL routing per scale: `/scale/major/A` for shareable links
- [ ] Open Graph image generation per scale (fretboard previews)
- [ ] Note name toggle: sharps (C#) vs flats (Db)
- [ ] Mobile swipe gestures on fretboard

## Phase 2 — Educational Features
- [ ] Scale degrees display (1, b3, 4, 5, b7 instead of note names)
- [ ] Interval highlighting (show the characteristic note of each mode)
- [ ] Scale relationship diagram (show how modes relate)
- [ ] Box patterns overlay (CAGED system positions)
- [ ] Side-by-side scale comparison
- [ ] "Learn this scale" mode with finger positions

## Phase 3 — Audio
- [ ] Click a fret note to hear it (Web Audio API synthesis)
- [ ] "Play scale" button — ascending + descending arpeggiation
- [ ] Metronome with BPM control for practice
- [ ] MIDI output support (Web MIDI API)

## Phase 4 — Advanced
- [ ] Chord shapes overlaid on scale (diatonic chord diagrams)
- [ ] Chord progression generator from scale
- [ ] Interactive quiz: "Find this note on the fretboard"
- [ ] Custom scale builder (define your own intervals)
- [ ] World/exotic scales (Hungarian Minor, Whole Tone, Diminished)
- [ ] Printable PDF fretboard diagrams

## SEO
- Target: "guitar scale chart", "fretboard scale viewer", "guitar modes"
- Structured data for music education tools
- Sitemap with one URL per scale/root combination
