import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3D Raumplan - Moderne Europäische Wohnung',
  description: 'Interaktiver 3D Raumplan für eine moderne europäische Wohnung',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
