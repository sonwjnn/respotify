import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Minimun 6 characters required' }),
  name: z
    .string()
    .min(1, { message: 'User name is required' })
    .refine(name => !name.includes(' '), {
      message: 'User name cannot contain spaces',
    }),
})
