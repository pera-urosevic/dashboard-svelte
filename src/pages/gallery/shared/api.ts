import type { PhotoRecord } from '@pages/gallery/shared/types'
import { alertServerError } from '@services/alert'
import { busy } from '@services/store'

const SERVER = `${import.meta.env.VITE_API_SERVER}/gallery`

export const apiGallery = async (search: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/${encodeURIComponent(search)}`)
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return []
  }
  const data = await res.json() as PhotoRecord[]
  return data
}

export const apiGallerySync = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/sync`)
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return []
  }
  const data = await res.json() as PhotoRecord[]
  return data
}

export const apiGalleryDeploy = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/deploy`)
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return []
  }
}

export const apiPhoto = async (photoID: number) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/photo/${photoID}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as PhotoRecord
  return data
}

export const apiPhotoUpdate = async (record: PhotoRecord) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/photo/${record.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as PhotoRecord
  return data
}

export const apiPhotoOpen = async (photoPath: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/open/${encodeURIComponent(photoPath)}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
}

export const apiPhotoFlickr = async (photoID: number) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/photo/${photoID}/flickr`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
}

