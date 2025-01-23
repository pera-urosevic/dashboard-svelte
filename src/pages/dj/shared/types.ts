export type Result = {
  query: string
  path: string
  meta: Record<string, any>
  datetime: string
}

export type Results = Result[]

export type Sync = {
  added: string[]
  removed: string[]
}

export type Queries = {
  name: string
  query: string
}[]
