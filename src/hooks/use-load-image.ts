import { useSupabaseClient } from '@supabase/auth-helpers-react'

export const useLoadImage = (imagePath: string, bucket: string) => {
  // const supabaseClient = useSupabaseClient()
  // if (!imagePath || !bucket) return null
  // if (imagePath.startsWith('https://')) {
  //   return imagePath
  // }
  // const { data: imageData } = supabaseClient.storage
  //   .from(bucket)
  //   .getPublicUrl(imagePath)
  // return imageData.publicUrl
  return ''
}
