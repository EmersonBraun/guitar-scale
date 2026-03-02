import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ScaleViewer from '@/components/ScaleViewer'
import { NOTES, SCALE_PATTERNS, slugToScaleKey, slugToNote, getNoteDisplay, getScaleNotes, scaleKeyToSlug, noteToSlug } from '@/lib/scales'
import type { Metadata } from 'next'
import type { Note } from '@/lib/scales'

interface PageProps {
  params: Promise<{ type: string; root: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type, root } = await params
  const scaleKey = slugToScaleKey(type)
  const note = slugToNote(root)

  if (!scaleKey || !note) return {}

  const pattern = SCALE_PATTERNS[scaleKey]
  const scaleNotes = getScaleNotes(note, pattern.intervals)
  const title = `${note} ${pattern.name} Scale — String Scales`
  const description = `Visualize the ${note} ${pattern.name} scale on the fretboard. Notes: ${scaleNotes.join(', ')}. Interactive fretboard for guitar, bass, ukulele, banjo, and more.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  const params: { type: string; root: string }[] = []
  for (const key of Object.keys(SCALE_PATTERNS)) {
    for (const note of NOTES) {
      params.push({
        type: scaleKeyToSlug(key),
        root: noteToSlug(note),
      })
    }
  }
  return params
}

export default async function ScalePage({ params }: PageProps) {
  const { type, root } = await params
  const scaleKey = slugToScaleKey(type)
  const note = slugToNote(root)

  if (!scaleKey || !note) {
    notFound()
  }

  return (
    <Suspense>
      <ScaleViewer initialRoot={note} initialScaleKey={scaleKey} />
    </Suspense>
  )
}
