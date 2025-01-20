export type Entry = {
  name: string
  size: number
  modified: string
  ok: number
  recursive: number
}

export type EntryNode = {
  entry: Entry
  children: EntryNode[]
}
