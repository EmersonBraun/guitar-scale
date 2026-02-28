'use client'
import { useState } from 'react'
import Fretboard from '@/components/Fretboard'
import { NOTES, SCALE_PATTERNS, getScaleNotes } from '@/lib/scales'
import type { Note } from '@/lib/scales'

export default function Home() {
  const [root, setRoot] = useState<Note>('A')
  const [scaleKey, setScaleKey] = useState('pentatonicMinor')
  const [showNames, setShowNames] = useState(true)

  const pattern = SCALE_PATTERNS[scaleKey]
  const scaleNotes = getScaleNotes(root, pattern.intervals)

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-amber-400 mb-2">🎸 Guitar Scale Viewer</h1>
        <p className="text-gray-400">Visualize scales on the fretboard</p>
      </header>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase tracking-wider">Root Note</label>
          <select
            value={root}
            onChange={e => setRoot(e.target.value as Note)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
          >
            {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase tracking-wider">Scale Type</label>
          <select
            value={scaleKey}
            onChange={e => setScaleKey(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
          >
            {Object.entries(SCALE_PATTERNS).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase tracking-wider">Display</label>
          <button
            onClick={() => setShowNames(!showNames)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              showNames
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-gray-800 border-gray-600 text-gray-300'
            }`}
          >
            {showNames ? 'Notes On' : 'Notes Off'}
          </button>
        </div>
      </div>

      {/* Scale info */}
      <div className="mb-6 p-4 bg-gray-900 rounded-xl border border-gray-700">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-amber-400 font-semibold">{root} {pattern.name}</span>
          <span className="text-gray-500 text-sm">({scaleNotes.length} notes)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {scaleNotes.map((note, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                i === 0
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-indigo-700 text-white'
              }`}
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-500 ring-2 ring-amber-300" />
          <span className="text-gray-400">Root note</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-600" />
          <span className="text-gray-400">Scale note</span>
        </div>
      </div>

      {/* Fretboard */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
        <Fretboard root={root} scaleNotes={scaleNotes} showNoteNames={showNames} />
      </div>

      <footer className="mt-8 text-center text-gray-600 text-sm">
        Built by <a href="https://emersonbraun.dev" className="text-amber-500 hover:underline">Emerson Braun</a>
      </footer>
    </main>
  )
}
