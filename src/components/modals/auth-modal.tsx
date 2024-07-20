'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { LoginForm } from '../auth/login-form'
import { useModal } from '@/store/use-modal-store'
import { RegisterForm } from '@/components/auth/register-form'

export const AuthModal = () => {
  const { isOpen, type, close, data } = useModal()

  const { authType = 'register' } = data

  const isModalOpen = isOpen && type === 'auth'

  const AuthContent = () => {
    if (authType === 'login') {
      return <LoginForm />
    } else {
      return <RegisterForm />
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={close}>
      <DialogContent className="w-auto border-none bg-transparent p-0">
        <AuthContent />
      </DialogContent>
    </Dialog>
  )
}
