import { ThemeProvider } from 'next-themes'
import { SkeletonProvider } from './skeleton-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="spotify-theme"
    >
      <SkeletonProvider>{children}</SkeletonProvider>
    </ThemeProvider>
  )
}
