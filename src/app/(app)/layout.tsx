export type RootLayoutProps = {
  children: React.ReactNode
}

export type BodyProps = {
  children: React.ReactNode
  locale?: string
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
