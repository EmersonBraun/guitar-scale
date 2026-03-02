'use client'
import { SCALE_DEGREES, getScaleNotes, SCALE_PATTERNS, getNoteDisplay } from '@/lib/scales'
import type { Note } from '@/lib/scales'

interface LearnScaleProps {
  root: Note
  scaleKey: string
  useFlats: boolean
}

export default function LearnScale({ root, scaleKey, useFlats }: LearnScaleProps) {
  const pattern = SCALE_PATTERNS[scaleKey]
  const scaleNotes = getScaleNotes(root, pattern.intervals)
  const degrees = SCALE_DEGREES[scaleKey]

  if (!degrees) return null

  // Finger suggestions per string position for first position
  const fingerMap: Record<number, string> = {
    0: 'Open',
    1: 'Index (1)',
    2: 'Middle (2)',
    3: 'Ring (3)',
    4: 'Pinky (4)',
    5: 'Pinky (4)',
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-amber-400">Learn: {getNoteDisplay(root, useFlats)} {pattern.name}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {scaleNotes.map((note, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              i === 0
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                i === 0
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {getNoteDisplay(note, useFlats)}
            </div>
            <div>
              <div className="text-white text-sm font-medium">
                {degrees[i]} — {getNoteDisplay(note, useFlats)}
              </div>
              <div className="text-xs text-gray-400">
                Finger: {fingerMap[Math.min(i, 5)]}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-400 p-3 bg-gray-800 rounded-lg border border-gray-700">
        <strong className="text-gray-300">Practice tip:</strong> Start from the root note ({getNoteDisplay(root, useFlats)}) on the lowest string,
        play ascending to the highest note, then descend back. Use a metronome starting at 60 BPM.
      </div>
    </div>
  )
}
