import { alertServerError } from '@services/alert'
import { busy } from '../../store'
import type { PostObject, PostRecord } from '@pages/blog/types'
import { parsePostRecord } from '@pages/blog/parse'

const API = import.meta.env.VITE_API_SERVER

export const apiBlog = async (search: string) => {
  busy.set(true)
  const res = await fetch(`${API}/blog/${encodeURIComponent(search)}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const records: PostRecord[] = await res.json()
  const posts = records.map(parsePostRecord)
  return posts
}

export const apiBlogDeploy = async () => {
  busy.set(true)
  const res = await fetch(`${API}/blog/deploy`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
}

export const apiPost = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${API}/blog/post/${id}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const record: PostRecord = await res.json()
  return record
}

export const apiPostCreate = async (url: string) => {
  busy.set(true)
  const res = await fetch(`${API}/blog/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const { id } = await res.json()
  return id
}

export const apiPostRemove = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${API}/blog/post/${id}`, { method: 'DELETE' })
  busy.set(false)
  return res.ok
}

export const apiPostScrape = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${API}/blog/post/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const record = await res.json()
  return record as PostRecord
}

export const apiPostUpdate = async (post?: PostObject) => {
  if (!post) return
  const update = {
    url: post.url,
    title: post.title,
    description: post.description,
    image: post.image,
    category: post.category,
    template: post.template,
  }
  busy.set(true)
  const res = await fetch(`${API}/blog/post/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as PostRecord
  return data
}
