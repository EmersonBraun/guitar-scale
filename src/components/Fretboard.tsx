'use client'
import { isRootNote, isScaleNote, getFretNote, getNoteDisplay, getScaleDegree, isCharacteristicNote, getFretFrequency } from '@/lib/scales'
import type { Note, Tuning } from '@/lib/scales'
import { useCallback } from 'react'

const FRET_MARKERS = [3, 5, 7, 9, 12]
const NUM_FRETS = 13

type NoteDisplayMode = 'names' | 'degrees' | 'off'

interface FretboardProps {
  root: Note
  scaleNotes: Note[]
  tuning: Tuning
  scaleKey: string
  noteDisplay?: NoteDisplayMode
  useFlats?: boolean
  onNoteClick?: (frequency: number, note: Note) => void
  highlightCharacteristic?: boolean
  cagedPattern?: number | null
  cagedPatterns?: { name: string; color: string; frets: { string: number; fret: number }[] }[]
}

export default function Fretboard({
  root,
  scaleNotes,
  tuning,
  scaleKey,
  noteDisplay = 'names',
  useFlats = false,
  onNoteClick,
  highlightCharacteristic = false,
  cagedPattern = null,
  cagedPatterns,
}: FretboardProps) {
  // Desktop: high string on top (reversed)
  const desktopStrings = [...tuning.notes].reverse()
  // Mobile: low string on left (original order)
  const mobileStrings = [...tuning.notes]

  const isCagedHighlighted = useCallback(
    (actualStringIdx: number, fret: number) => {
      if (cagedPattern === null || !cagedPatterns) return null
      const pattern = cagedPatterns[cagedPattern]
      if (!pattern) return null
      const match = pattern.frets.find(
        f => f.string === actualStringIdx && f.fret === fret
      )
      return match ? pattern.color : null
    },
    [cagedPattern, cagedPatterns]
  )

  const getNoteLabel = (note: Note) => {
    if (noteDisplay === 'off') return ''
    if (noteDisplay === 'degrees') {
      return getScaleDegree(note, scaleNotes, scaleKey) || ''
    }
    return getNoteDisplay(note, useFlats)
  }

  const handleClick = (actualStringIdx: number, fret: number, note: Note) => {
    if (!onNoteClick) return
    const freq = getFretFrequency(actualStringIdx, fret, tuning.notes)
    onNoteClick(freq, note)
  }

  const noteCircle = (note: Note, isRoot: boolean, isChar: boolean, cagedColor: string | null, actualStringIdx: number, fret: number) => (
    <button
      type="button"
      onClick={() => handleClick(actualStringIdx, fret, note)}
      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
        onNoteClick ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default'
      } ${
        isRoot
          ? 'bg-amber-500 text-gray-900 ring-2 ring-amber-300'
          : isChar
            ? 'bg-rose-500 text-white ring-2 ring-rose-300'
            : 'bg-indigo-600 text-white'
      }`}
      style={cagedColor ? { outline: `3px solid ${cagedColor}`, outlineOffset: '2px' } : undefined}
    >
      {getNoteLabel(note)}
    </button>
  )

  const fretMarkerLabel = (fret: number) => {
    if (FRET_MARKERS.includes(fret + 1)) {
      return fret + 1 === 12 ? '12 \u25CF\u25CF' : `${fret + 1} \u25CF`
    }
    return fret === 0 ? 'Open' : ''
  }

  const renderCell = (openNote: Note, actualStringIdx: number, fret: number) => {
    const note = getFretNote(openNote, fret)
    const inScale = isScaleNote(openNote, fret, scaleNotes)
    const isRoot = isRootNote(openNote, fret, root)
    const isChar = highlightCharacteristic && isCharacteristicNote(note, scaleNotes, scaleKey)
    const cagedColor = isCagedHighlighted(actualStringIdx, fret)
    return { note, inScale, isRoot, isChar, cagedColor }
  }

  return (
    <>
      {/* Desktop: horizontal (strings as rows, frets as columns) */}
      <div className="hidden md:block overflow-x-auto touch-pan-x">
        <div className="min-w-max">
          <div className="flex mb-1">
            <div className="w-10 shrink-0" />
            {Array.from({ length: NUM_FRETS }, (_, fret) => (
              <div key={fret} className="w-14 text-center text-xs text-gray-500">
                {fretMarkerLabel(fret)}
              </div>
            ))}
          </div>

          {desktopStrings.map((openNote, displayIdx) => {
            const actualIdx = tuning.strings - 1 - displayIdx
            return (
              <div key={displayIdx} className="flex items-center mb-1">
                <div className="w-10 text-center text-xs font-bold text-amber-400 shrink-0">
                  {getNoteDisplay(openNote, useFlats)}
                </div>
                {Array.from({ length: NUM_FRETS }, (_, fret) => {
                  const { note, inScale, isRoot, isChar, cagedColor } = renderCell(openNote, actualIdx, fret)
                  return (
                    <div
                      key={fret}
                      className="w-14 h-10 border-l border-gray-700 flex items-center justify-center relative"
                      style={{
                        borderLeftWidth: fret === 0 ? 3 : 1,
                        borderLeftColor: fret === 0 ? '#6b7280' : '#374151',
                      }}
                    >
                      <div className="absolute inset-x-0 top-1/2 h-px bg-gray-500" />
                      {inScale && noteCircle(note, isRoot, isChar, cagedColor, actualIdx, fret)}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: vertical (guitar standing up — low string left, high string right, nut top, body bottom) */}
      <div className="md:hidden">
        {/* String labels: low to high, left to right */}
        <div className="flex mb-1">
          <div className="w-11 shrink-0" />
          {mobileStrings.map((openNote, idx) => (
            <div key={idx} className="flex-1 text-center text-xs font-bold text-amber-400">
              {getNoteDisplay(openNote, useFlats)}
            </div>
          ))}
        </div>

        {/* Fret rows: open at top, fret 12 at bottom */}
        {Array.from({ length: NUM_FRETS }, (_, fret) => (
          <div
            key={fret}
            className="flex items-center"
            style={{
              borderTop: `${fret === 0 ? 3 : 1}px solid ${fret === 0 ? '#6b7280' : '#374151'}`,
            }}
          >
            <div className="w-11 shrink-0 text-center text-xs text-gray-500 py-1">
              {fretMarkerLabel(fret)}
            </div>

            {mobileStrings.map((openNote, actualIdx) => {
              const { note, inScale, isRoot, isChar, cagedColor } = renderCell(openNote, actualIdx, fret)
              return (
                <div
                  key={actualIdx}
                  className="flex-1 h-11 flex items-center justify-center relative"
                >
                  <div className="absolute inset-y-0 left-1/2 w-px bg-gray-500 -translate-x-px" />
                  {inScale && noteCircle(note, isRoot, isChar, cagedColor, actualIdx, fret)}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
