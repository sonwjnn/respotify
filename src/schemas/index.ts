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

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
const ACCEPTED_AUDIO_TYPES = ['audio/mp3']

export const SongSchema = z.object({
  title: z.string().min(5).max(100),
  author: z.string().min(5).max(50),
  song: z.string().min(1, {
    message: 'Attachment is required.',
  }),
  // .refine(file => file?.size <= MAX_FILE_SIZE, `Max song size is 5MB.`)
  // .refine(
  //   file => ACCEPTED_AUDIO_TYPES.includes(file?.type),
  //   'Only .mp3 format is supported.'
  // ),
  image: z.string().optional(),
})

export const PlaylistSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(5).max(500),
  image: z.string().optional(),
})
