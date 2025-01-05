<script lang="ts">
  import { apiAddBookmark, apiGetBookmarks, apiRemoveBookmark } from '@pages/cleaner/shared/api'
  import { onMount } from 'svelte'

  type Props = {
    path: string
    onPath: (path: string) => void
  }
  const { path, onPath }: Props = $props()

  let bookmark = $state<string>()
  let bookmarks = $state<string[]>()

  const onChange = async (e: Event) => {
    bookmark = (e.target as HTMLSelectElement).value
    if (!bookmark) return
    onPath(bookmark)
  }

  const onAddBookmark = async () => {
    const data = await apiAddBookmark(path)
    if (!data) return
    bookmarks = data
  }

  const onRemoveBookmark = async () => {
    const data = await apiRemoveBookmark(path)
    if (!data) return
    bookmarks = data
  }

  onMount(async () => {
    const data = await apiGetBookmarks()
    if (!data) return
    bookmarks = data
  })
</script>

{#if bookmarks}
  <select onchange={onChange}>
    <option value="">Bookmarks</option>
    {#each bookmarks as bookmark}
      <option value={bookmark}>{bookmark}</option>
    {/each}
  </select>
  <button disabled={!bookmark}>🗑️</button>
  <button onclick={onAddBookmark}>➕</button>
{/if}

<style>
</style>
