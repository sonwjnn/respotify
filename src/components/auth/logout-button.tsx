'use client'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

interface LogoutButtonProps {
  children?: React.ReactNode
  className?: string
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const onClick = () => {
    signOut()
  }

  return (
    <span onClick={onClick} className={cn('cursor-pointer', className)}>
      {children}
    </span>
  )
}
