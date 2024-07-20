'use client'

import { LoginForm } from '@/components/auth/login-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
}

export const LoginButton = ({
  children,
  mode = 'redirect',
}: LoginButtonProps) => {
  const router = useRouter()
  const { open } = useModal()

  const onClick = () => {
    if (mode === 'modal') {
      open('auth', { authType: 'login' })
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
