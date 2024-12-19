export type Task = {
  name: string
  enabled: boolean
  cmd: string
  args: string[]
}

export type Monitor = Task & {
  match: {
    cmd: string
    regex: string
  }
}

export type Daily = Task & {
  net: boolean
  lastRun: string
  time: string
}

export type Weekly = Task & {
  net: boolean
  lastRun: string
  time: string
  day: string
}

export type Config = {
  monitor: Monitor[]
  daily: Daily[]
  weekly: Weekly[]
}
