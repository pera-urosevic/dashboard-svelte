export type Entry = {
  name: string
  size: number
  modified: string
  status: Status
  recursive: number
}

export enum Status {
  Unknown = -1,
  Dirty = 0,
  Clean = 1,
}

export type EntryNode = {
  entry: Entry
  children: EntryNode[]
}
