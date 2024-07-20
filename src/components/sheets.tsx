'use client'

import { SidebarSheet } from '@/components/sheets/sidebar-sheet'
import { useMountedState } from 'react-use'

export const Sheets = () => {
  const isMounted = useMountedState()

  if (!isMounted()) return null

  return (
    <>
      <SidebarSheet />
    </>
  )
}
