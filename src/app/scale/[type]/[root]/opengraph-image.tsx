import { ImageResponse } from 'next/og'
import { NOTES, SCALE_PATTERNS, slugToScaleKey, slugToNote, getScaleNotes } from '@/lib/scales'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: Promise<{ type: string; root: string }> }) {
  const { type, root } = await params
  const scaleKey = slugToScaleKey(type)
  const note = slugToNote(root)

  if (!scaleKey || !note) {
    return new ImageResponse(
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#030712', color: '#fbbf24', fontSize: 48, fontWeight: 'bold' }}>
        String Scales
      </div>,
      size
    )
  }

  const pattern = SCALE_PATTERNS[scaleKey]
  const scaleNotes = getScaleNotes(note, pattern.intervals)
  const tuning = ['E', 'A', 'D', 'G', 'B', 'E']
  const strings = [...tuning].reverse()

  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#030712', padding: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ color: '#fbbf24', fontSize: 42, fontWeight: 'bold' }}>
          {note} {pattern.name}
        </span>
        <span style={{ color: '#6b7280', fontSize: 24, marginLeft: 20 }}>
          String Scales
        </span>
      </div>

      {/* Scale notes pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 30 }}>
        {scaleNotes.map((n, i) => (
          <div
            key={i}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 18,
              fontWeight: 'bold',
              background: i === 0 ? '#f59e0b' : '#4f46e5',
              color: i === 0 ? '#111' : '#fff',
            }}
          >
            {n}
          </div>
        ))}
      </div>

      {/* Simplified fretboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {strings.map((openNote, strIdx) => (
          <div key={strIdx} style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <div style={{ width: 40, textAlign: 'center', color: '#fbbf24', fontSize: 16, fontWeight: 'bold' }}>
              {openNote}
            </div>
            {Array.from({ length: 13 }, (_, fret) => {
              const noteIdx = (NOTES.indexOf(openNote as typeof NOTES[number]) + fret) % 12
              const fretNote = NOTES[noteIdx]
              const inScale = scaleNotes.includes(fretNote)
              const isRoot = fretNote === note

              return (
                <div
                  key={fret}
                  style={{
                    width: 72,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: `${fret === 0 ? 3 : 1}px solid ${fret === 0 ? '#6b7280' : '#374151'}`,
                    position: 'relative',
                  }}
                >
                  {inScale && (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 'bold',
                        background: isRoot ? '#f59e0b' : '#4f46e5',
                        color: isRoot ? '#111' : '#fff',
                        border: isRoot ? '2px solid #fcd34d' : 'none',
                      }}
                    >
                      {fretNote}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>,
    size
  )
}
