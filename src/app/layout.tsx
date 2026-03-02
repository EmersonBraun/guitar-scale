import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://guitar-scale.vercel.app'),
  title: {
    default: 'String Scales — Interactive Fretboard Scale Charts',
    template: '%s — String Scales',
  },
  description:
    'Visualize scales on an interactive fretboard for guitar, bass, ukulele, banjo, mandolin, violin, and more. Supports major, minor, pentatonic, blues, modal, and exotic scales with multiple tunings.',
  keywords: [
    'guitar scale chart',
    'fretboard scale viewer',
    'guitar modes',
    'pentatonic scale guitar',
    'bass scale chart',
    'ukulele scales',
    'banjo scales',
    'mandolin scales',
    'string instrument scales',
    'CAGED system guitar',
    'learn guitar scales',
  ],
  openGraph: {
    type: 'website',
    title: 'String Scales',
    description: 'Interactive scale visualization for guitar, bass, ukulele, banjo, mandolin, violin, and more.',
    siteName: 'String Scales',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'String Scales',
  description: 'Interactive scale visualization tool for string instruments',
  applicationCategory: 'MusicApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Emerson Braun', url: 'https://emersonbraun.dev' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
