import { unsplash } from '@/lib/unsplash'

const DEFAULT_COUNT = 50
const DEFAULT_COLLECTION_IDS = ['317099']

export const getGenerateImages = async ({
  count = DEFAULT_COUNT,
  collectionIds = DEFAULT_COLLECTION_IDS,
}: {
  count: number
  collectionIds?: string[]
}) => {
  try {
    const images = await unsplash.photos.getRandom({
      collectionIds,
      count,
    })

    if (images.errors) {
      return []
    }

    let data = images.response

    if (!Array.isArray(data)) {
      data = [data]
    }

    return data
  } catch {
    return []
  }
}
