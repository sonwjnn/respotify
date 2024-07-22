'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useUploadModal } from '@/store/modals/use-upload-modal'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { useCurrentUser } from '@/hooks/use-current-user'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SongSchema } from '@/schemas'
import { createSong } from '@/actions/song'
import { FileUpload } from '@/components/file-upload'

export const UploadSongModal = () => {
  const uploadModal = useUploadModal()

  const [isLoading, startTransition] = useTransition()

  const [duration, setDuration] = useState<number | undefined>(undefined)
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof SongSchema>>({
    resolver: zodResolver(SongSchema),
    defaultValues: {
      author: '',
      title: '',
      song: '',
      image: '',
    },
  })

  const onChange = (open: boolean): void => {
    if (!open) {
      form.reset()
      uploadModal.onClose()
    }
  }

  useEffect(() => {
    if (audioUrl) {
      const sound = new Audio(audioUrl)

      sound.addEventListener('loadedmetadata', () => {
        setDuration(Math.round(sound.duration * 1000))
      })

      return () => {
        sound.removeEventListener('loadedmetadata', () => {
          setDuration(undefined)
        })
      }
    }
    return undefined
  }, [audioUrl])

  const onSubmit = (values: z.infer<typeof SongSchema>) => {
    startTransition(() => {
      createSong(values, duration)
        .then(response => {
          if (response?.error) {
            toast.error(response.error)
            return
          }

          toast.success('Song created!')
          form.reset()
        })
        .catch(e => console.log(e))
    })
  }

  return (
    <Modal
      title="Upload your songs"
      description="upload modal description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Song title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="song"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select song file</FormLabel>
                <FormControl>
                  <FileUpload
                    endpoint="songAudio"
                    value={field.value}
                    onChange={field.onChange}
                    setAudioUrl={setAudioUrl}
                    type="audio"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Select image file <i className="text-xs">(optional)</i>
                </FormLabel>
                <FormControl>
                  <FileUpload
                    endpoint="songImage"
                    value={field.value}
                    onChange={field.onChange}
                    type="image"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mx-auto mt-3 w-full"
            disabled={isLoading}
          >
            Create
          </Button>
        </form>
      </Form>
    </Modal>
  )
}
