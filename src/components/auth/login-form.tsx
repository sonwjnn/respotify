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
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { login } from '@/actions/login'
import { useModal } from '@/store/use-modal-store'

export const LoginForm = () => {
  const { open, close } = useModal()
  const [isPending, startTransition] = useTransition()
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
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values, callbackUrl)
        .then(data => {
          if (data?.error) {
            console.log(data.error)
            setError(data.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data.success)
            close()
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }

  const onProviderSignIn = (provider: 'github' | 'google') => {
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
        <div className="bg-destructive/15 mb-6 flex items-center gap-x-2 rounded-md p-3 text-sm text-destructive">
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
                      disabled={isPending}
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
                      disabled={isPending}
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
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="size-5 left-2.5 top-2.5 mr-2 animate-spin" />
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
            disabled={isPending}
          >
            {loadingGoogle ? (
              <Loader2 className="size-5 absolute left-2.5 top-2.5 mr-2 animate-spin" />
            ) : (
              <FcGoogle className="size-5 absolute left-2.5 top-2.5 mr-2" />
            )}
            Continue with Google
          </Button>
          <Button
            onClick={() => onProviderSignIn('github')}
            size="lg"
            variant="outline"
            disabled={isPending}
            className="relative w-full"
          >
            {loadingGithub ? (
              <Loader2 className="size-5 absolute left-2.5 top-2.5 mr-2 animate-spin" />
            ) : (
              <FaGithub className="size-5 absolute left-2.5 top-2.5 mr-2" />
            )}
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => open('auth', { authType: 'register' })}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
