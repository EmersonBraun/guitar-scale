'use client'
import { getDiatonicChords, getNoteDisplay } from '@/lib/scales'
import type { Note } from '@/lib/scales'

interface ChordProgressionsProps {
  root: Note
  scaleKey: string
  useFlats: boolean
}

const COMMON_PROGRESSIONS = [
  { name: 'I-IV-V-I', degrees: [0, 3, 4, 0] },
  { name: 'I-V-vi-IV', degrees: [0, 4, 5, 3] },
  { name: 'ii-V-I', degrees: [1, 4, 0] },
  { name: 'I-vi-IV-V', degrees: [0, 5, 3, 4] },
  { name: 'vi-IV-I-V', degrees: [5, 3, 0, 4] },
  { name: 'I-IV-vi-V', degrees: [0, 3, 5, 4] },
]

export default function ChordProgressions({ root, scaleKey, useFlats }: ChordProgressionsProps) {
  const chords = getDiatonicChords(root, scaleKey)

  if (chords.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Diatonic Chords */}
      <div>
        <h3 className="text-sm font-semibold text-amber-400 mb-3">Diatonic Chords</h3>
        <div className="flex flex-wrap gap-2">
          {chords.map((chord, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-lg border text-center ${
                i === 0
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-gray-800 border-gray-600 text-gray-200'
              }`}
            >
              <div className="text-xs text-gray-400">{chord.numeral}</div>
              <div className="font-medium text-sm">
                {getNoteDisplay(chord.note, useFlats)}
                {chord.quality === 'min' && 'm'}
                {chord.quality === 'dim' && 'dim'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Progressions */}
      <div>
        <h4 className="text-sm font-semibold text-amber-400 mb-3">Common Progressions</h4>
        <div className="flex flex-wrap gap-2">
          {COMMON_PROGRESSIONS.map((prog, i) => {
            const valid = prog.degrees.every(d => d < chords.length)
            if (!valid) return null
            return (
              <div key={i} className="px-3 py-2 bg-gray-800 rounded-lg border border-gray-600">
                <div className="text-xs text-gray-500 mb-1">{prog.name}</div>
                <div className="flex gap-1">
                  {prog.degrees.map((d, j) => (
                    <span key={j} className="text-sm text-white font-medium">
                      {getNoteDisplay(chords[d].note, useFlats)}
                      {chords[d].quality === 'min' && 'm'}
                      {chords[d].quality === 'dim' && '°'}
                      {j < prog.degrees.length - 1 && <span className="text-gray-500 mx-1">{'\u2192'}</span>}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
