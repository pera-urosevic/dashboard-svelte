import type { Config } from '@pages/micron/types'
import { busy } from '../../store'

const SERVER = `${import.meta.env.VITE_API_SERVER}/micron`

export const apiStatus = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/status`)
  busy.set(false)
  const data = await res.json()
  return data.enabled
}

export const apiPause = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/pause`)
  busy.set(false)
  const data = await res.json()
  return data.enabled
}

export const apiResume = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/resume`)
  busy.set(false)
  const data = await res.json()
  return data.enabled
}

export const apiConfig = async () => {
  busy.set(true)
  const res = await fetch(`${SERVER}/config`)
  busy.set(false)
  const data = await res.json()
  return data
}

export const apiConfigUpdate = async (config: Config) => {
  busy.set(true)
  const res = await fetch(`${SERVER}/config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  })
  busy.set(false)
  const data = await res.json()
  return data
}
