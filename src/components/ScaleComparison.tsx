'use client'
import { useState } from 'react'
import Fretboard from './Fretboard'
import { NOTES, SCALE_PATTERNS, TUNINGS, getScaleNotes } from '@/lib/scales'
import type { Note } from '@/lib/scales'

interface ScaleComparisonProps {
  tuningKey: string
  useFlats: boolean
}

export default function ScaleComparison({ tuningKey, useFlats }: ScaleComparisonProps) {
  const [rootA, setRootA] = useState<Note>('A')
  const [scaleA, setScaleA] = useState('pentatonicMinor')
  const [rootB, setRootB] = useState<Note>('A')
  const [scaleB, setScaleB] = useState('blues')

  const tuning = TUNINGS[tuningKey]
  const notesA = getScaleNotes(rootA, SCALE_PATTERNS[scaleA].intervals)
  const notesB = getScaleNotes(rootB, SCALE_PATTERNS[scaleB].intervals)

  const selectClass = 'bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-amber-500'

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-amber-400">Side-by-Side Comparison</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Scale A */}
        <div className="p-3 bg-gray-900 rounded-xl border border-gray-700">
          <div className="flex gap-2 mb-3">
            <select value={rootA} onChange={e => setRootA(e.target.value as Note)} className={selectClass}>
              {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <select value={scaleA} onChange={e => setScaleA(e.target.value)} className={selectClass}>
              {Object.entries(SCALE_PATTERNS).map(([k, { name }]) => (
                <option key={k} value={k}>{name}</option>
              ))}
            </select>
          </div>
          <Fretboard root={rootA} scaleNotes={notesA} tuning={tuning} scaleKey={scaleA} useFlats={useFlats} />
        </div>

        {/* Scale B */}
        <div className="p-3 bg-gray-900 rounded-xl border border-gray-700">
          <div className="flex gap-2 mb-3">
            <select value={rootB} onChange={e => setRootB(e.target.value as Note)} className={selectClass}>
              {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <select value={scaleB} onChange={e => setScaleB(e.target.value)} className={selectClass}>
              {Object.entries(SCALE_PATTERNS).map(([k, { name }]) => (
                <option key={k} value={k}>{name}</option>
              ))}
            </select>
          </div>
          <Fretboard root={rootB} scaleNotes={notesB} tuning={tuning} scaleKey={scaleB} useFlats={useFlats} />
        </div>
      </div>

      {/* Common notes */}
      <div className="text-sm text-gray-400">
        Common notes:{' '}
        {notesA.filter(n => notesB.includes(n)).map((n, i) => (
          <span key={i} className="px-2 py-0.5 mx-1 bg-indigo-700 text-white rounded-full text-xs">
            {n}
          </span>
        ))}
        {notesA.filter(n => notesB.includes(n)).length === 0 && (
          <span className="text-gray-500">None</span>
        )}
      </div>
    </div>
  )
}
