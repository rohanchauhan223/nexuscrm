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
      <head>
        <script src="https://cdn.tailwindcss.com" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
