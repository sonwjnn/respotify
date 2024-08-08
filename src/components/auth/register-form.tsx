'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Loader2, TriangleAlert } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { register } from '@/actions/register'

import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { useModal } from '@/store/use-modal-store'

export const RegisterForm = () => {
  const { open } = useModal()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [loadingGithub, setLoadingGithub] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onProviderSignUp = (provider: 'github' | 'google') => {
    setLoadingGithub(provider === 'github')
    setLoadingGoogle(provider === 'google')

    signIn(provider, { callbackUrl: '/' })
  }

  const onCredentialSignUp = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then(data => {
        if (data?.error) {
          form.reset()
          setError(data.error)
        }

        if (data?.success) {
          form.reset()
          setSuccess(data.success)
          open('auth', { authType: 'login' })
        }
      })
    })
  }

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>Something went wrong</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onCredentialSignUp)}
            className="space-y-2.5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            disabled={isPending}
            onClick={() => onProviderSignUp('google')}
            variant="outline"
            size="lg"
            className="relative w-full"
          >
            {loadingGoogle ? (
              <Loader2 className="absolute left-2.5 top-2.5 mr-2 size-5 animate-spin" />
            ) : (
              <FcGoogle className="absolute left-2.5 top-2.5 mr-2 size-5" />
            )}
            Continue with Google
          </Button>
          <Button
            disabled={isPending}
            onClick={() => onProviderSignUp('github')}
            variant="outline"
            size="lg"
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
          Already have an account?{' '}
          <span
            onClick={() => open('auth', { authType: 'login' })}
            className="cursor-pointer text-sky-700 hover:underline"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
