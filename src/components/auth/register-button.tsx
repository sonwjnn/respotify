'use client'

import { useRouter } from 'next/navigation'
import { useModal } from '@/store/use-modal-store'

interface RegisterButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
}

export const RegisterButton = ({
  children,
  mode = 'redirect',
}: RegisterButtonProps) => {
  const { open } = useModal()
  const router = useRouter()

  const onClick = () => {
    if (mode === 'modal') {
      open('auth', { authType: 'register' })
    } else {
      router.push('/auth/register')
    }
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
