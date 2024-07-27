'use client'

import { usePalette } from 'color-thief-react'
import Image from 'next/image'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { LuImage } from 'react-icons/lu'

// import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import { DeleteIcon, MusicNote } from '@/public/icons'
import { cn } from '@/lib/utils'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { useCurrentUser } from '@/hooks/use-current-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { updateUser } from '@/actions/user'
import { useModal } from '@/store/use-modal-store'
import { useSession } from 'next-auth/react'

export const EditUserModal = () => {
  const { isOpen, close, type } = useModal()

  const isModalOpen = isOpen && type === 'editUser'

  const { setBgColor: setBgColorStore } = useUserStore()
  const user = useCurrentUser()
  const { update } = useSession()

  const [file, setFile] = useState<string>('')
  const [bgColor, setBgColor] = useState<string>('')
  const [isRemove, setRemove] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const labelRef = useRef<HTMLLabelElement>(null)

  const { data: dataColor } = usePalette(file as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name || '',
      image: user?.image || '',
    },
  })

  useEffect(() => {
    if (user && isModalOpen) {
      form.setValue('name', user?.name || '')
      form.setValue('image', user?.image || '')
      setFile(user?.image || '')
    }
  }, [user, form, isModalOpen])

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

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    startTransition(() => {
      updateUser(values)
        .then(data => {
          if (data) {
            setBgColorStore(bgColor)

            toast.success('User edited!')
            update()
            close()
          }
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  const onRemove = (e: any): void => {
    e.preventDefault()
    setRemove(true)
    form.setValue('image', '')
    setFile('')
  }

  return (
    <Modal
      className="md:max-w-[550px]"
      title="Edit details user"
      description=""
      isOpen={isModalOpen}
      onChange={close}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row  ">
            <div className="group aspect-square h-[180px] w-[180px] rounded-full  shadow-xl">
              <label
                htmlFor="user_img"
                className="relative flex  h-full w-full cursor-pointer items-center justify-center  text-white"
                ref={labelRef}
              >
                <div
                  className={cn(
                    `absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-2 rounded-full bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100`,
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
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      className="object-cover"
                      src={file || '/images/song.svg'}
                      fill
                      alt="playlist img"
                      sizes="100%"
                    />
                  </div>
                )}
              </label>
              <Input
                className="h-0 bg-neutral-800 p-0 opacity-0"
                disabled={isPending}
                type="file"
                accept="image/*"
                onChange={handleChange}
                // {...field}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
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
