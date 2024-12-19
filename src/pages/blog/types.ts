export enum Category {
  none = '',
  listen = 'Listen',
  play = 'Play',
  read = 'Read',
  see = 'See',
  watch = 'Watch',
}

export enum Template {
  default = 'Default',
  youtube = 'Youtube',
}

export type PostRecord = {
  id?: number
  timestamp: string
  title: string
  category: Category
  template: Template
  description: string
  image: string
  url: string
}

export type PostObject = {
  id: number
  timestamp: string
  title: string
  category: Category
  template: Template
  description: string
  image: string
  imagePost: string
  imageExcerpt: string
  imageThumbnail: string
  url: string
  urlDomain: string
  status: string
  datetime: string
}
