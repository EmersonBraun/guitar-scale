'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Fretboard from './Fretboard'
import Metronome from './Metronome'
import ModeRelationship from './ModeRelationship'
import ScaleComparison from './ScaleComparison'
import FretboardQuiz from './FretboardQuiz'
import CustomScaleBuilder from './CustomScaleBuilder'
import ChordProgressions from './ChordProgressions'
import LearnScale from './LearnScale'
import {
  SCALE_PATTERNS, TUNINGS, CAGED_PATTERNS,
  getScaleNotes, getNoteDisplay, NOTES,
  scaleKeyToSlug, noteToSlug,
} from '@/lib/scales'
import { playNote } from '@/lib/audio'
import type { Note } from '@/lib/scales'

type NoteDisplayMode = 'names' | 'degrees' | 'off'
type ActiveTab = 'fretboard' | 'compare' | 'quiz' | 'custom' | 'learn'

const VALID_DISPLAYS: NoteDisplayMode[] = ['names', 'degrees', 'off']
const VALID_TABS: ActiveTab[] = ['fretboard', 'compare', 'quiz', 'custom', 'learn']

interface ScaleViewerProps {
  initialRoot?: Note
  initialScaleKey?: string
}

export default function ScaleViewer({ initialRoot = 'A', initialScaleKey = 'pentatonicMinor' }: ScaleViewerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialized = useRef(false)

  // Read initial values from query params (fall back to props/defaults)
  const paramTuning = searchParams.get('tuning')
  const paramDisplay = searchParams.get('display') as NoteDisplayMode | null
  const paramFlats = searchParams.get('flats')
  const paramChar = searchParams.get('char')
  const paramCaged = searchParams.get('caged')
  const paramTab = searchParams.get('tab') as ActiveTab | null

  const [root, setRoot] = useState<Note>(initialRoot)
  const [scaleKey, setScaleKey] = useState(initialScaleKey)
  const [tuningKey, setTuningKey] = useState(
    paramTuning && TUNINGS[paramTuning] ? paramTuning : 'standard'
  )
  const [noteDisplay, setNoteDisplay] = useState<NoteDisplayMode>(
    paramDisplay && VALID_DISPLAYS.includes(paramDisplay) ? paramDisplay : 'names'
  )
  const [useFlats, setUseFlats] = useState(paramFlats === '1')
  const [highlightChar, setHighlightChar] = useState(paramChar === '1')
  const [cagedPattern, setCagedPattern] = useState<number | null>(() => {
    const n = paramCaged !== null ? parseInt(paramCaged, 10) : NaN
    return !isNaN(n) && n >= 0 && n < CAGED_PATTERNS.length ? n : null
  })
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    paramTab && VALID_TABS.includes(paramTab) ? paramTab : 'fretboard'
  )
  const [showControls, setShowControls] = useState(true)

  const pattern = SCALE_PATTERNS[scaleKey]
  const scaleNotes = getScaleNotes(root, pattern.intervals)
  const tuning = TUNINGS[tuningKey]

  // Build URL with all state
  const buildUrl = useCallback((
    r: Note, sk: string, tk: string, nd: NoteDisplayMode,
    flats: boolean, char: boolean, caged: number | null, tab: ActiveTab
  ) => {
    const slug = scaleKeyToSlug(sk)
    const noteSlug = noteToSlug(r)
    const params = new URLSearchParams()

    if (tk !== 'standard') params.set('tuning', tk)
    if (nd !== 'names') params.set('display', nd)
    if (flats) params.set('flats', '1')
    if (char) params.set('char', '1')
    if (caged !== null) params.set('caged', String(caged))
    if (tab !== 'fretboard') params.set('tab', tab)

    const qs = params.toString()
    return `/scale/${slug}/${noteSlug}${qs ? `?${qs}` : ''}`
  }, [])

  // Sync URL on state change (skip first render to avoid replacing SSG URL needlessly)
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      return
    }
    const url = buildUrl(root, scaleKey, tuningKey, noteDisplay, useFlats, highlightChar, cagedPattern, activeTab)
    router.replace(url, { scroll: false })
  }, [root, scaleKey, tuningKey, noteDisplay, useFlats, highlightChar, cagedPattern, activeTab, buildUrl, router])

  const handleRootChange = (newRoot: Note) => setRoot(newRoot)
  const handleScaleChange = (newKey: string) => setScaleKey(newKey)

  const handleNoteClick = useCallback((frequency: number, _note: Note) => {
    playNote(frequency)
  }, [])

  const handlePrint = () => window.print()

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: 'fretboard', label: 'Fretboard' },
    { key: 'compare', label: 'Compare' },
    { key: 'learn', label: 'Learn' },
    { key: 'quiz', label: 'Quiz' },
    { key: 'custom', label: 'Custom Builder' },
  ]

  const displayCycle: NoteDisplayMode[] = ['names', 'degrees', 'off']

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <header className="mb-8 text-center print:hidden">
        <h1 className="text-4xl font-bold text-amber-400 mb-2">String Scales</h1>
        <p className="text-gray-400">Visualize scales on the fretboard for any string instrument</p>
        <button
          onClick={() => setShowControls(v => !v)}
          className="mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {showControls ? 'Hide controls' : 'Show controls'}
        </button>
      </header>

      {/* Print-only header */}
      <div className="hidden print:block mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          {getNoteDisplay(root, useFlats)} {pattern.name} Scale
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          {tuning.instrument} — {tuning.name} tuning ({tuning.notes.map(n => getNoteDisplay(n, useFlats)).join(' ')})
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {scaleNotes.map((note, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                i === 0
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-indigo-700 text-white'
              }`}
            >
              {getNoteDisplay(note, useFlats)}
            </span>
          ))}
        </div>
      </div>

      {showControls && (
        <div className="print:hidden">
          {/* Controls grid: 2 cols on mobile, auto-flow on desktop */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 mb-6">
            {/* Row 1: Root Note + Scale Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Root Note</label>
              <select
                value={root}
                onChange={e => handleRootChange(e.target.value as Note)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                {NOTES.map(n => (
                  <option key={n} value={n}>{getNoteDisplay(n, useFlats)}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Scale Type</label>
              <select
                value={scaleKey}
                onChange={e => handleScaleChange(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                {Object.entries(SCALE_PATTERNS).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            {/* Row 2: Tuning + Display */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Tuning</label>
              <select
                value={tuningKey}
                onChange={e => setTuningKey(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                {Object.entries(
                  Object.entries(TUNINGS).reduce<Record<string, [string, typeof TUNINGS[string]][]>>((groups, entry) => {
                    const instrument = entry[1].instrument
                    if (!groups[instrument]) groups[instrument] = []
                    groups[instrument].push(entry)
                    return groups
                  }, {})
                ).map(([instrument, tunings]) => (
                  <optgroup key={instrument} label={instrument}>
                    {tunings.map(([key, { name }]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Display</label>
              <button
                onClick={() => {
                  const idx = displayCycle.indexOf(noteDisplay)
                  setNoteDisplay(displayCycle[(idx + 1) % displayCycle.length])
                }}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  noteDisplay === 'names'
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : noteDisplay === 'degrees'
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300'
                }`}
              >
                {noteDisplay === 'names' ? 'Notes' : noteDisplay === 'degrees' ? 'Degrees' : 'Off'}
              </button>
            </div>

            {/* Row 3: Notation + Characteristic Note */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Notation</label>
              <button
                onClick={() => setUseFlats(!useFlats)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  useFlats
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300'
                }`}
              >
                {useFlats ? 'Flats (b)' : 'Sharps (#)'}
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Highlight</label>
              <button
                onClick={() => setHighlightChar(!highlightChar)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  highlightChar ? 'bg-rose-600 border-rose-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-300'
                }`}
              >
                Characteristic
              </button>
            </div>

            {/* Row 4: CAGED (full width on mobile) */}
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">CAGED</label>
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-800 border border-gray-600 rounded-lg h-[38px] w-fit">
                {CAGED_PATTERNS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setCagedPattern(cagedPattern === i ? null : i)}
                    className={`w-7 h-7 rounded-full text-xs font-bold border-2 transition-all ${
                      cagedPattern === i ? 'text-white scale-110' : 'text-gray-400 border-gray-600'
                    }`}
                    style={cagedPattern === i ? { borderColor: p.color, backgroundColor: p.color + '33' } : undefined}
                    title={p.name}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scale info */}
          <div className="mb-6 p-4 bg-gray-900 rounded-xl border border-gray-700">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-amber-400 font-semibold">
                {getNoteDisplay(root, useFlats)} {pattern.name}
              </span>
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
                  {getNoteDisplay(note, useFlats)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto print:hidden">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-gray-900 text-amber-400 border border-gray-700 border-b-gray-900'
                : 'bg-gray-800 text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-gray-900 rounded-xl rounded-tl-none border border-gray-700 p-4 print-fretboard-area">
        {activeTab === 'fretboard' && (
          <div className="space-y-4">
            {/* Legend + Print */}
            <div className="flex items-start justify-between">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500 ring-2 ring-amber-300" />
                <span className="text-gray-400">Root note</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600" />
                <span className="text-gray-400">Scale note</span>
              </div>
              {highlightChar && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-rose-500 ring-2 ring-rose-300" />
                  <span className="text-gray-400">Characteristic note</span>
                </div>
              )}
            </div>
            <button
              onClick={handlePrint}
              className="print:hidden shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border bg-gray-800 border-gray-600 text-gray-400 hover:text-white transition-colors"
              title="Print PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
            </button>
            </div>

            <Fretboard
              root={root}
              scaleNotes={scaleNotes}
              tuning={tuning}
              scaleKey={scaleKey}
              noteDisplay={noteDisplay}
              useFlats={useFlats}
              onNoteClick={handleNoteClick}
              highlightCharacteristic={highlightChar}
              cagedPattern={cagedPattern}
              cagedPatterns={CAGED_PATTERNS}
            />

            {/* Interactive sections — hidden on print */}
            <div className="print:hidden space-y-4">
              <ModeRelationship currentScaleKey={scaleKey} />
              <ChordProgressions root={root} scaleKey={scaleKey} useFlats={useFlats} />
              <Metronome />
            </div>
          </div>
        )}

        <div className="print:hidden">
          {activeTab === 'compare' && (
            <ScaleComparison tuningKey={tuningKey} useFlats={useFlats} />
          )}

          {activeTab === 'learn' && (
            <LearnScale root={root} scaleKey={scaleKey} useFlats={useFlats} />
          )}

          {activeTab === 'quiz' && (
            <FretboardQuiz tuning={tuning} useFlats={useFlats} />
          )}

          {activeTab === 'custom' && (
            <CustomScaleBuilder tuningKey={tuningKey} useFlats={useFlats} />
          )}
        </div>
      </div>

      {/* Screen footer */}
      <footer className="mt-8 text-center text-gray-600 text-sm print:hidden">
        Built by{' '}
        <a href="https://emersonbraun.dev" className="text-amber-500 hover:underline">
          Emerson Braun
        </a>
      </footer>

      {/* Print-only footer */}
      <footer className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
        <p>String Scales — stringscales.com — Built by Emerson Braun</p>
      </footer>
    </main>
  )
}
