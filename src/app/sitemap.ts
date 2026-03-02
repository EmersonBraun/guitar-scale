import { NOTES, SCALE_PATTERNS, scaleKeyToSlug, noteToSlug } from '@/lib/scales'
import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://guitar-scale.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  for (const key of Object.keys(SCALE_PATTERNS)) {
    for (const note of NOTES) {
      entries.push({
        url: `${BASE_URL}/scale/${scaleKeyToSlug(key)}/${noteToSlug(note)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return entries
}
