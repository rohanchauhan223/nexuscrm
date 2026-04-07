import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NexusCRM',
  description: 'Full Stack CRM built with Next.js and Supabase',
}

export const dynamic = 'force-static'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
