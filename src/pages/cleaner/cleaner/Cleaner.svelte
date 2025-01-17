<script lang="ts">
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import Bookmarks from '@pages/cleaner/cleaner/Bookmarks.svelte'
  import Breadcrumbs from '@pages/cleaner/cleaner/Breadcrumbs.svelte'
  import Status from '@pages/cleaner/cleaner/Status.svelte'
  import { apiAdd, apiDelete, apiList, apiOpen, apiRemove } from '@pages/cleaner/shared/api'
  import type { Entry } from '@pages/cleaner/shared/types'
  import { onMount } from 'svelte'

  let path = $state<string>('')
  let entries = $state<Entry[]>([])

  let sortedEntries = $derived.by(() => {
    const sorted = [...entries]
    sorted.sort((a, b) => {
      if (a.ok && !b.ok) return 1
      if (!a.ok && b.ok) return -1
      if (a.size < 0 && b.size > -1) return -1
      if (a.size > -1 && b.size < 0) return 1
      return a.name.localeCompare(b.name)
    })
    return sorted
  })

  const onFolder = async (folder: string) => {
    await onPath([path, folder].join('/').replaceAll('//', '/'))
  }

  const onAdd = async (entry: Entry) => {
    const data = await apiAdd(path, entry.name)
    if (!data) return
    entries = data
  }

  const onRemove = async (entry: Entry) => {
    const data = await apiRemove(path, entry.name)
    if (!data) return
    entries = data
  }

  const onPath = async (pathNew: string) => {
    const data = await apiList(pathNew)
    if (!data) return
    entries = data
    path = pathNew
    window.location.hash = encodeURIComponent(path)
  }

  const onOpen = async (pathOpen: string) => {
    await apiOpen(pathOpen)
  }

  const onDelete = async (entry: Entry) => {
    const confirmed = window.confirm(`Delete ${entry.name}?`)
    if (!confirmed) return
    const data = await apiDelete(path, entry.name)
    if (!data) return
    entries = data
  }

  onMount(async () => {
    const pathInitial = decodeURIComponent(window.location.hash.slice(1)) || '/'
    onPath(pathInitial)
  })
</script>

<Header>
  <a href="/cleaner.html">Cleaner</a>
  <Bookmarks {path} {onPath} />
</Header>
<Main>
  <div class="container">
    <Breadcrumbs {path} {onPath} {onOpen} />
    <div class="grid">
      {#if entries.length === 0}
        Nothing found...
      {:else}
        <div class="status"></div>
        <div class="delete"></div>
        <div class="name">Name</div>
        <div class="size">Size</div>
        <div class="modified">Modified</div>
        {#each sortedEntries as entry}
          <div class="status"><Status {entry} {onAdd} {onRemove} /></div>
          <div class="delete"><button onclick={() => onDelete(entry)}>🗑️</button></div>
          {#if entry.size < 0}
            <div class="name" title={entry.name}>
              <button onclick={() => onFolder(entry.name)}>{entry.name}</button>
            </div>
            <div class="size">0</div>
          {:else}
            <div class="name" title={entry.name}>{entry.name}</div>
            <div class="size">{entry.size}</div>
          {/if}
          <div class="modified">{entry.modified}</div>
        {/each}
      {/if}
    </div>
  </div>
</Main>

<style>
  .container {
    max-width: 100%;
    overflow: hidden;
    padding-right: 16px;
  }
  .grid {
    margin-top: 10px;
    display: grid;
    grid-template-columns: auto auto 1fr auto auto;
    align-items: center;
    gap: 16px;
    row-gap: 8px;
    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      button {
        border: none;
        background-color: transparent;
        color: var(--color-light);
        padding: 0;
        height: auto;
        width: 100%;
        text-align: left;
        text-decoration: underline;
        &:hover {
          color: var(--color-primary);
        }
      }
    }
    .size {
      white-space: nowrap;
      text-align: right;
    }
    .modified {
      white-space: nowrap;
      text-align: right;
    }
  }
</style>
