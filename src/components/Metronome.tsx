'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { playMetronomeClick } from '@/lib/audio'

export default function Metronome() {
  const [bpm, setBpm] = useState(120)
  const [playing, setPlaying] = useState(false)
  const [beat, setBeat] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setPlaying(false)
    setBeat(0)
  }, [])

  const start = useCallback(() => {
    stop()
    setPlaying(true)
    let count = 0
    playMetronomeClick(true)
    setBeat(1)
    intervalRef.current = setInterval(() => {
      count++
      const isAccent = count % 4 === 0
      playMetronomeClick(isAccent)
      setBeat((count % 4) + 1)
    }, (60 / bpm) * 1000)
  }, [bpm, stop])

  useEffect(() => {
    return () => stop()
  }, [stop])

  return (
    <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
      {/* Mobile: 2 rows / Tablet+Desktop: single row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-xs text-gray-400 uppercase tracking-wider shrink-0">Metronome</span>
          <input
            type="range"
            min={40}
            max={240}
            value={bpm}
            onChange={e => {
              setBpm(Number(e.target.value))
              if (playing) start()
            }}
            className="flex-1 min-w-0 accent-amber-500"
          />
          <span className="text-sm text-white shrink-0">{bpm} BPM</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(b => (
              <div
                key={b}
                className={`w-3 h-3 rounded-full transition-colors ${
                  playing && beat === b
                    ? b === 1
                      ? 'bg-amber-400'
                      : 'bg-indigo-400'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <button
            onClick={playing ? stop : start}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              playing
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-gray-900'
            }`}
          >
            {playing ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  )
}
