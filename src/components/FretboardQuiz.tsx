'use client'
import { useState, useCallback } from 'react'
import { NOTES, getFretNote, getNoteDisplay } from '@/lib/scales'
import type { Note, Tuning } from '@/lib/scales'

const FRET_MARKERS = [3, 5, 7, 9, 12]
const NUM_FRETS = 13

interface FretboardQuizProps {
  tuning: Tuning
  useFlats?: boolean
}

export default function FretboardQuiz({ tuning, useFlats = false }: FretboardQuizProps) {
  const [targetNote, setTargetNote] = useState<Note>(() => NOTES[Math.floor(Math.random() * 12)])
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  const desktopStrings = [...tuning.notes].reverse()
  const mobileStrings = [...tuning.notes]

  const nextQuestion = useCallback(() => {
    setTargetNote(NOTES[Math.floor(Math.random() * 12)])
    setFeedback(null)
  }, [])

  const handleClick = (openNote: Note, fret: number) => {
    if (feedback) return
    const clickedNote = getFretNote(openNote, fret)
    setTotal(t => t + 1)
    if (clickedNote === targetNote) {
      setScore(s => s + 1)
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
    setTimeout(nextQuestion, 800)
  }

  const fretMarkerLabel = (fret: number) => {
    if (FRET_MARKERS.includes(fret + 1)) {
      return fret + 1 === 12 ? '12 \u25CF\u25CF' : `${fret + 1} \u25CF`
    }
    return fret === 0 ? 'Open' : ''
  }

  const quizCell = (openNote: Note, fret: number) => (
    <button
      type="button"
      onClick={() => handleClick(openNote, fret)}
      className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-gray-600/50 transition-colors"
    >
      {' '}
    </button>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-amber-400">Fretboard Quiz</h3>
        <div className="text-sm text-gray-400">
          Score: <span className="text-white font-bold">{score}/{total}</span>
          {total > 0 && (
            <span className="ml-2 text-gray-500">
              ({Math.round((score / total) * 100)}%)
            </span>
          )}
        </div>
      </div>

      <div className={`text-center p-3 rounded-lg border transition-colors ${
        feedback === 'correct'
          ? 'bg-green-900/40 border-green-500 text-green-400'
          : feedback === 'wrong'
            ? 'bg-red-900/40 border-red-500 text-red-400'
            : 'bg-gray-800 border-gray-600 text-white'
      }`}>
        <span className="text-lg font-bold">
          {feedback === 'correct'
            ? 'Correct!'
            : feedback === 'wrong'
              ? 'Wrong!'
              : `Find: ${getNoteDisplay(targetNote, useFlats)}`}
        </span>
      </div>

      {/* Desktop: horizontal */}
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

          {desktopStrings.map((openNote, strIdx) => (
            <div key={strIdx} className="flex items-center mb-1">
              <div className="w-10 text-center text-xs font-bold text-amber-400 shrink-0">
                {getNoteDisplay(openNote, useFlats)}
              </div>
              {Array.from({ length: NUM_FRETS }, (_, fret) => (
                <div
                  key={fret}
                  className="w-14 h-10 border-l border-gray-700 flex items-center justify-center relative"
                  style={{
                    borderLeftWidth: fret === 0 ? 3 : 1,
                    borderLeftColor: fret === 0 ? '#6b7280' : '#374151',
                  }}
                >
                  <div className="absolute inset-x-0 top-1/2 h-px bg-gray-500" />
                  {quizCell(openNote, fret)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical (low string left, high string right) */}
      <div className="md:hidden">
        <div className="flex mb-1">
          <div className="w-11 shrink-0" />
          {mobileStrings.map((openNote, idx) => (
            <div key={idx} className="flex-1 text-center text-xs font-bold text-amber-400">
              {getNoteDisplay(openNote, useFlats)}
            </div>
          ))}
        </div>

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
            {mobileStrings.map((openNote, idx) => (
              <div
                key={idx}
                className="flex-1 h-11 flex items-center justify-center relative"
              >
                <div className="absolute inset-y-0 left-1/2 w-px bg-gray-500 -translate-x-px" />
                {quizCell(openNote, fret)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={() => { setScore(0); setTotal(0); nextQuestion() }}
        className="text-sm text-gray-400 hover:text-white transition-colors"
      >
        Reset score
      </button>
    </div>
  )
}
