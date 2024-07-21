import { getSelf } from '@/data/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const handleAuth = async () => {
  const self = await getSelf()

  if (!self) throw new Error('Unauthorized')

  return { userId: self.id }
}

export const ourFileRouter = {
  songAudio: f({ audio: { maxFileSize: '8MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url }
    }),
  songImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      return { url: file.url }
    }),
  userImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      return { url: file.url }
    }),
  playlistImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      return { url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
