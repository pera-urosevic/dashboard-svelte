import type { Results, Sync } from '@pages/dj/types'
import { busy } from '../../store'

const SERVER = `${import.meta.env.VITE_API_SERVER}/dj`

export const apiQueries = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/queries`)
  busy.set(false)
  const data = await res.json()
  return data
}

export const apiQuery = async (query: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/query/${encodeURIComponent(query)}`)
  busy.set(false)
  const data = await res.json()
  return data as Results
}

export const apiSearch = async (search: string) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/search/${encodeURIComponent(search)}`)
  busy.set(false)
  const data = await res.json()
  return data as Results
}

export const apiSync = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/sync`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } })
  busy.set(false)
  const data = await res.json()
  return data as Sync
}
