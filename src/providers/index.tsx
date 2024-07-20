import { ThemeProvider } from 'next-themes'
import { SkeletonProvider } from './skeleton-provider'
import { SupabaseProvider } from './supabase-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SupabaseProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="spotify-theme"
      >
        <SkeletonProvider>{children}</SkeletonProvider>
      </ThemeProvider>
    </SupabaseProvider>
  )
}
