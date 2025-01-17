export type PhotoRecord = {
  id: number
  path: string
  type: string
  modified: number
  online: number
  album: string
  datetime: string
  title: string
  description: string
  keywords: string
  copyright: string
  flickr: string
  pixelfed: string
}

export type PhotoObject = {
  id: number
  path: string
  type: string
  modified: number
  offline: boolean
  album: string
  datetime: string
  title: string
  description: string
  keywords: string
  copyright: string
  imageThumbnail: string
  fix: boolean
  flickr: string
  pixelfed: string
}

