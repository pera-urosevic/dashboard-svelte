<script lang="ts">
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import { apiPhoto, apiPhotoFlickr, apiPhotoUpdate } from '@pages/gallery/shared/api'
  import PhotoMeta from '@pages/gallery/photo/PhotoMeta.svelte'
  import PhotoPreview from '@pages/gallery/photo/PhotoPreview.svelte'
  import type { PhotoRecord } from '@pages/gallery/shared/types'
  import { onMount } from 'svelte'

  const params = new URLSearchParams(window.location.search)
  const id = Number(params.get('id'))

  let flickLog = $state<string>()
  let record = $state<PhotoRecord>()

  const onFlickr = () => {
    apiPhotoFlickr(id)
  }

  const onUpdate = async (meta: PhotoRecord) => {
    const data = await apiPhotoUpdate(meta)
    if (!data) return
    record = data
  }

  onMount(async () => {
    const res = await apiPhoto(id)
    if (!res) return
    record = res
  })
</script>

<Header>
  <a href="/gallery.html">Gallery</a>
  <button onclick={onFlickr}>Flickr</button>
</Header>
<Main>
  {#if flickLog}
    <div class="log">
      {#each flickLog as line}
        <div class="line">{line}</div>
      {/each}
    </div>
  {/if}
  {#if record}
    <div class="editor">
      <PhotoMeta {record} {onUpdate} />
      <PhotoPreview
        url={`${import.meta.env.VITE_GALLERY_CDN}/images/${record.album} - ${record.datetime}.${record.type}`}
        path={record.path}
      />
    </div>
  {/if}
</Main>

<style>
  .editor {
    display: grid;
    justify-content: center;
    align-items: start;
    grid-template-columns: 600px 1fr;
    gap: 16px;
  }
  .log {
    margin: 0 0 16px 0;
    border: 1px solid var(--color-primary);
    padding: 8px;
    font-family: 'Consolas', monospace;
  }
</style>
