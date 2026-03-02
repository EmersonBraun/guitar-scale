'use client'
import { useState } from 'react'
import Fretboard from './Fretboard'
import { NOTES, TUNINGS, getScaleNotes } from '@/lib/scales'
import type { Note } from '@/lib/scales'

interface CustomScaleBuilderProps {
  tuningKey: string
  useFlats: boolean
}

const INTERVAL_NAMES = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7']

export default function CustomScaleBuilder({ tuningKey, useFlats }: CustomScaleBuilderProps) {
  const [root, setRoot] = useState<Note>('C')
  const [selected, setSelected] = useState<boolean[]>([true, false, false, false, false, false, false, false, false, false, false, false])

  const tuning = TUNINGS[tuningKey]

  const toggleInterval = (idx: number) => {
    if (idx === 0) return // root always selected
    const next = [...selected]
    next[idx] = !next[idx]
    setSelected(next)
  }

  // Build scale notes from selected semitones
  const rootIdx = NOTES.indexOf(root)
  const scaleNotes: Note[] = selected
    .map((on, i) => (on ? NOTES[(rootIdx + i) % 12] : null))
    .filter((n): n is Note => n !== null)

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-amber-400">Custom Scale Builder</h3>

      <div className="flex items-center gap-3">
        <label className="text-xs text-gray-400">Root:</label>
        <select
          value={root}
          onChange={e => setRoot(e.target.value as Note)}
          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-amber-500"
        >
          {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {INTERVAL_NAMES.map((name, i) => (
          <button
            key={i}
            onClick={() => toggleInterval(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              selected[i]
                ? i === 0
                  ? 'bg-amber-500 text-gray-900 border-amber-400'
                  : 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-gray-800 text-gray-400 border-gray-600 hover:border-gray-400'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-400">
        Notes: {scaleNotes.join(' - ')} ({scaleNotes.length} notes)
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-700 p-3">
        <Fretboard
          root={root}
          scaleNotes={scaleNotes}
          tuning={tuning}
          scaleKey="custom"
          useFlats={useFlats}
        />
      </div>
    </div>
  )
}
