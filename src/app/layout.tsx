import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guitar Scale Viewer',
  description: 'Visualize guitar scales on an interactive fretboard. Supports major, minor, pentatonic, blues, and modal scales.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
