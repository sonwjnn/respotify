'use client'

import { usePalette } from 'color-thief-react'
import Image from 'next/image'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { LuImage } from 'react-icons/lu'

import { usePlaylist } from '@/store/use-playlist'
import { DeleteIcon } from '@/public/icons'
import { cn } from '@/lib/utils'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { updatePlaylist } from '@/actions/playlist'
import { PlaylistSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useModal } from '@/store/use-modal-store'
import { useParams } from 'next/navigation'

export const EditPlaylistModal = () => {
  const params = useParams()

  const { setBgColor: setBgColorStore } = usePlaylist()
  const { isOpen, close, type, data } = useModal()

  const isModalOpen = isOpen && type === 'editPlaylist'

  const { playlist } = data

  const [file, setFile] = useState<string>(playlist?.imagePath || '')
  const [bgColor, setBgColor] = useState<string>('')
  const [isRemove, setRemove] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const labelRef = useRef<HTMLLabelElement>(null)

  const { data: dataColor } = usePalette(file as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  const form = useForm<z.infer<typeof PlaylistSchema>>({
    resolver: zodResolver(PlaylistSchema),
    defaultValues: {
      title: playlist?.title,
      description: playlist?.description || '',
      image: '',
    },
  })

  useEffect(() => {
    if (playlist && isModalOpen) {
      form.setValue('title', playlist?.title || '')
      form.setValue('description', playlist?.description || '')
      form.setValue('image', playlist?.imagePath || '')
      setFile(playlist?.imagePath || '')
    }
  }, [playlist, form, isModalOpen])

  useEffect(() => {
    if (dataColor) {
      setBgColor(dataColor?.[2] ?? '#e0e0e0')
    }
  }, [dataColor])

  const handleChange = (event: any): void => {
    if (event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0])
      setFile(imageUrl)
    }
  }

  const onSubmit = (values: z.infer<typeof PlaylistSchema>) => {
    if (!playlist || !playlist.id) return
    // const imageFile = values.playlist_img?.[0]
    startTransition(() => {
      updatePlaylist(values, playlist.id)
        .then(data => {
          if (data?.error) {
            toast.error(data.error as string)
          } else {
            setBgColorStore(bgColor)
            toast.success('Playlist edited!')
            close()
          }
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  const onRemove = (e: any): void => {
    e.preventDefault()
    setRemove(true)
    form.setValue('image', '/images/playlist.svg')
    setFile('/images/playlist.svg')
  }

  return (
    <Modal
      className="md:max-w-[550px]"
      title="Edit details playlist"
      description="upload playlist description"
      isOpen={isModalOpen}
      onChange={close}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start ">
            <div className="group  h-[180px] w-[180px] rounded-sm  shadow-xl">
              <label
                htmlFor="playlist_img"
                className="relative flex  h-full w-full cursor-pointer items-center justify-center  text-white"
              >
                <div
                  className={cn(
                    'absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-2 rounded-sm bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100',
                    isPending && 'cursor-not-allowed opacity-100'
                  )}
                >
                  {isPending ? (
                    <Spinner size="lg" />
                  ) : (
                    <>
                      {file && (
                        <div className="absolute bottom-5 right-5 flex flex-col items-center justify-center gap-x-2 opacity-0 group-hover:opacity-100">
                          <Button
                            onClick={() => labelRef?.current?.click()}
                            className="flex gap-x-2 bg-transparent text-sm text-white"
                          >
                            <LuImage />
                            Change cover
                          </Button>
                          <Button
                            onClick={onRemove}
                            className="flex gap-x-2 bg-transparent text-sm text-white"
                          >
                            <DeleteIcon color="#991b1b" />
                            Remove
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {file !== '' && (
                  <div className="relative aspect-square h-full w-full overflow-hidden rounded-sm">
                    <Image
                      className="object-cover"
                      src={file || '/images/playlist.svg'}
                      fill
                      alt="playlist img"
                      sizes="100%"
                    />
                  </div>
                )}
              </label>
              <Input
                className="h-0 bg-neutral-800 p-0 opacity-0"
                id="image"
                disabled={isPending}
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="flex h-[180px] w-full flex-col gap-y-4 text-white ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Title</FormLabel> */}
                    <FormControl>
                      <Input
                        className="bg-neutral-800"
                        disabled={isPending}
                        placeholder="Playlist title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Title</FormLabel> */}
                    <FormControl>
                      <textarea
                        className="h-full w-full resize-none rounded-md border  border-transparent bg-neutral-800 p-3 text-sm text-white outline-none placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed"
                        placeholder="Write your description"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="ml-auto  mt-2 w-full md:w-[30%]"
            disabled={isPending}
          >
            Save
          </Button>
        </form>
      </Form>
    </Modal>
  )
}
