import type { Entry } from '@pages/cleaner/shared/types'
import { alertServerError } from '@services/alert'
import { busy } from '@services/store'

const SERVER = `${import.meta.env.VITE_API_SERVER}/cleaner`

export const apiGetBookmarks = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/bookmarks`)
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
  }
  const data = await res.json()
  return data as string[]
}

export const apiAddBookmark = async (bookmark: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookmark),
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
  }
  const data = await res.json()
  return data as string[]
}

export const apiRemoveBookmark = async (bookmark: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/bookmarks`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookmark),
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
  }
  const data = await res.json()
  return data as string[]
}

export const apiList = async (path: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/list/${encodeURIComponent(path)}`)
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
  }
  const data = await res.json()
  return data as Entry[]
}

export const apiOpen = async (path: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/open/${encodeURIComponent(path)}`)
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
  }
}

export const apiAdd = async (path: string, name: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, name }),
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
  }
  const data = await res.json()
  return data as Entry[]
}

export const apiRemove = async (path: string, name: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, name }),
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
  }
  const data = await res.json()
  return data as Entry[]
}

