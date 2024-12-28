import { isValid } from '@pages/gallery/photo/lint'
import type { PhotoRecord, PhotoObject } from '@pages/gallery/shared/types'

export const parseRecords = (records: PhotoRecord[], show: string): PhotoObject[] => {
  if (!records) return []
  const photos = records.map((record) => {
    const photo: PhotoObject = {
      id: record.id,
      path: record.path,
      type: record.type,
      modified: record.modified,
      album: record.album,
      datetime: record.datetime,
      title: record.title,
      description: record.description,
      keywords: record.keywords,
      copyright: record.copyright,
      imageThumbnail: `${import.meta.env.VITE_GALLERY_CDN}/thumbnails/${record.album} - ${record.datetime}.${record.type}`,
      fix: !isValid(record),
      offline: !record.online,
    }
    return photo
  }).filter((photo) => {
    if (show === 'fix') return photo.fix
    return true
  })
  return photos
}
