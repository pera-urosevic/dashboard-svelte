<script lang="ts">
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import { apiPhoto, apiPhotoUpdate } from '@pages/gallery/shared/api'
  import PhotoMeta from '@pages/gallery/photo/PhotoMeta.svelte'
  import PhotoPreview from '@pages/gallery/photo/PhotoPreview.svelte'
  import type { PhotoRecord } from '@pages/gallery/shared/types'
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'
  import PhotoInfo from '@pages/gallery/photo/PhotoInfo.svelte'

  const params = new URLSearchParams(window.location.search)
  const id = Number(params.get('id'))

  let record = $state<PhotoRecord>()

  const onPixelfed = async () => {
    if (!record) return
    const recordNew = { ...record }
    if (recordNew.pixelfed) {
      recordNew.pixelfed = ''
    } else {
      recordNew.pixelfed = recordNew.pixelfed ? '' : dayjs().format('YYYY-MM-DD HH:mm:ss')
      window.open('https://pixelfed.social/i/web/compose', '_blank')
    }
    const data = await apiPhotoUpdate(recordNew)
    if (!data) return
    record = data
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
</Header>
<Main>
  {#if record}
    <div class="editor">
      <div>
        <PhotoMeta {record} {onUpdate} />
        <PhotoInfo {record} {onPixelfed} />
      </div>
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
</style>
