import { Suspense } from 'react'
import ScaleViewer from '@/components/ScaleViewer'

export default function Home() {
  return (
    <Suspense>
      <ScaleViewer />
    </Suspense>
  )
}
