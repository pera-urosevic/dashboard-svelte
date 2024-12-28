import { Category, type PostObject, type PostRecord } from '@pages/blog/shared/types'
import dayjs from 'dayjs'

export const parsePostRecord = (postRecord: PostRecord): PostObject => {
  if (!postRecord.id) throw new Error("Missing field id")
  const post = {
    id: postRecord.id,
    timestamp: postRecord.timestamp,
    title: postRecord.title,
    category: postRecord.category,
    template: postRecord.template,
    description: postRecord.description,
    image: postRecord.image,
    imagePost: `${import.meta.env.VITE_BLOG_CDN}/images/post/${postRecord.timestamp}-image.jpg`,
    imageExcerpt: `${import.meta.env.VITE_BLOG_CDN}/images/excerpt/${postRecord.timestamp}-image.jpg`,
    imageThumbnail: `${import.meta.env.VITE_BLOG_CDN}/images/thumbnail/${postRecord.timestamp}-image.jpg`,
    url: postRecord.url,
    urlDomain: new URL(postRecord.url).hostname,
    status: postRecord.category === Category.none ? 'Draft' : 'Published',
    datetime: dayjs(Number(postRecord.timestamp)).format('YYYY-MM-DD HH:mm:ss'),
  }
  return post
}
