'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import { UploadButton } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string | undefined
  endpoint: 'songAudio' | 'playlistImage' | 'userImage' | 'songImage'
  type: 'audio' | 'image'
  setAudioUrl?: (url: string) => void
}

export const FileUpload = ({
  onChange,
  value,
  endpoint,
  type = 'image',
  setAudioUrl,
}: FileUploadProps) => {
  const fileType = value?.split('.').pop()

  const handleDelete = async () => {
    const res = await fetch('api/uploadthing', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: value,
      }),
    })

    if (!res.ok) {
      toast.error('Failed to delete file')
      return
    }

    onChange('')
  }

  if (value && fileType !== 'mp3') {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          sizes="100%"
          src={value}
          alt="Upload"
          className="rounded-full"
        />
        <button
          onClick={handleDelete}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
    )
  }

  if (value && fileType === 'mp3') {
    return (
      <div className="relative h-20 w-20">
        <FileIcon size={20} />
        <button
          onClick={handleDelete}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-lg dark:bg-zinc-300">
      <UploadButton
        appearance={{
          button: 'w-full text-sm font-medium dark:bg-[#262626]',
          allowedContent: 'hidden',
        }}
        content={{
          button: `Upload your ${type} file`,
        }}
        endpoint={endpoint}
        onClientUploadComplete={res => {
          onChange(res?.[0].url)
          setAudioUrl?.(res?.[0].url)
        }}
      />
    </div>
  )
}
