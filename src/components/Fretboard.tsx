'use client'
import { STANDARD_TUNING, isRootNote, isScaleNote, getFretNote } from '@/lib/scales'
import type { Note } from '@/lib/scales'

const FRET_MARKERS = [3, 5, 7, 9, 12]
const NUM_FRETS = 13

interface FretboardProps {
  root: Note
  scaleNotes: Note[]
  showNoteNames?: boolean
}

export default function Fretboard({ root, scaleNotes, showNoteNames = true }: FretboardProps) {
  const strings = [...STANDARD_TUNING].reverse() // high to low for display

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {/* Fret position markers */}
        <div className="flex mb-1">
          <div className="w-10 shrink-0" />
          {Array.from({ length: NUM_FRETS }, (_, fret) => (
            <div key={fret} className="w-14 text-center text-xs text-gray-500">
              {FRET_MARKERS.includes(fret + 1) ? (fret + 1 === 12 ? '12 ●●' : `${fret + 1} ●`) : fret === 0 ? 'Open' : ''}
            </div>
          ))}
        </div>

        {/* Strings */}
        {strings.map((openNote, strIdx) => (
          <div key={strIdx} className="flex items-center mb-1">
            {/* Open string label */}
            <div className="w-10 text-center text-xs font-bold text-amber-400 shrink-0">{openNote}</div>

            {/* Frets */}
            {Array.from({ length: NUM_FRETS }, (_, fret) => {
              const note = getFretNote(openNote, fret)
              const inScale = isScaleNote(openNote, fret, scaleNotes)
              const isRoot = isRootNote(openNote, fret, root)

              return (
                <div
                  key={fret}
                  className="w-14 h-10 border-l border-gray-700 flex items-center justify-center relative"
                  style={{ borderLeftWidth: fret === 0 ? 3 : 1, borderLeftColor: fret === 0 ? '#6b7280' : '#374151' }}
                >
                  {/* String line */}
                  <div className="absolute inset-x-0 top-1/2 h-px bg-gray-500" />

                  {/* Note circle */}
                  {inScale && (
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isRoot
                          ? 'bg-amber-500 text-gray-900 ring-2 ring-amber-300'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {showNoteNames ? note : ''}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
