'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Loader2, TriangleAlert } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useModal } from '@/store/use-modal-store'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import toast from 'react-hot-toast'

export const LoginForm = () => {
  const { open, close } = useModal()
  const [loading, setLoading] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loadingGithub, setLoadingGithub] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl')
  const urlError =
    searchParams?.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onCredentialSignIn = (values: z.infer<typeof LoginSchema>) => {
    setLoading(true)
    setLoadingLogin(true)

    signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    }).catch(() => {
      toast.error('Something went wrong!')
    })
  }

  const onProviderSignIn = (provider: 'github' | 'google') => {
    setLoading(true)
    setLoadingGithub(provider === 'github')
    setLoadingGoogle(provider === 'google')

    signIn(provider, { callbackUrl: '/' })
  }

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onCredentialSignIn)}
            className="space-y-2.5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={loading}
                      placeholder="sonwin@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              size="lg"
              disabled={loading}
            >
              {loadingLogin ? (
                <Loader2 className="left-2.5 top-2.5 mr-2 size-5 animate-spin" />
              ) : (
                'Continue'
              )}
            </Button>
          </form>
        </Form>

        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignIn('google')}
            size="lg"
            variant="outline"
            className="relative w-full"
            disabled={loading}
          >
            {loadingGoogle ? (
              <Loader2 className="absolute left-2.5 top-2.5 mr-2 size-5 animate-spin" />
            ) : (
              <FcGoogle className="absolute left-2.5 top-2.5 mr-2 size-5" />
            )}
            Continue with Google
          </Button>
          <Button
            onClick={() => onProviderSignIn('github')}
            size="lg"
            variant="outline"
            disabled={loading}
            className="relative w-full"
          >
            {loadingGithub ? (
              <Loader2 className="absolute left-2.5 top-2.5 mr-2 size-5 animate-spin" />
            ) : (
              <FaGithub className="absolute left-2.5 top-2.5 mr-2 size-5" />
            )}
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => open('auth', { authType: 'register' })}
            className="cursor-pointer text-sky-700 hover:underline"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
