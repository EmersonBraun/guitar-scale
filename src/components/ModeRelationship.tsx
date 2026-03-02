'use client'
import { MODE_RELATIONSHIPS, SCALE_PATTERNS } from '@/lib/scales'

interface ModeRelationshipProps {
  currentScaleKey: string
}

export default function ModeRelationship({ currentScaleKey }: ModeRelationshipProps) {
  const group = MODE_RELATIONSHIPS.find(g =>
    g.modes.some(m => m.key === currentScaleKey)
  )

  if (!group) return null

  return (
    <div className="p-4 bg-gray-900 rounded-xl border border-gray-700">
      <h3 className="text-sm font-semibold text-amber-400 mb-3">
        Mode Relationships ({group.parent} Scale)
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.modes.map(mode => {
          const pattern = SCALE_PATTERNS[mode.key]
          const isCurrent = mode.key === currentScaleKey
          return (
            <div
              key={mode.key}
              className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                isCurrent
                  ? 'bg-amber-500 text-gray-900 border-amber-400 font-bold'
                  : 'bg-gray-800 text-gray-300 border-gray-600'
              }`}
            >
              <div className="font-medium">{mode.degree}. {pattern?.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
