<script lang="ts">
  import Header from '@components/Header.svelte'
  import Intersect from '@components/Intersect.svelte'
  import Main from '@components/Main.svelte'
  import { apiGallery, apiGalleryDeploy, apiGallerySync } from '@pages/gallery/shared/api'
  import { parseRecords } from '@pages/gallery/gallery/parser'
  import type { PhotoObject, PhotoRecord } from '@pages/gallery/shared/types'
  import { onMount } from 'svelte'

  const params = new URLSearchParams(window.location.search)
  const chunkSize = 7 * 3

  let search = $state<string>(params.get('search') || '')
  let sort = $state<string>(params.get('sort') || 'desc')
  let show = $state<string>(params.get('show') || 'all')
  let records = $state<PhotoRecord[]>([])
  let photos = $derived<PhotoObject[]>(parseRecords(records, show))
  let count = $state(chunkSize)
  let visiblePhotos = $derived(photos.slice(0, count))

  const updateUrl = () => {
    window.location.href = `/gallery.html?search=${search}&sort=${sort}&show=${show}`
  }

  const onSync = async () => {
    records = await apiGallerySync()
    search = ''
    show = 'all'
    updateUrl()
  }

  const onSearch = async (e: Event) => {
    search = (e.target as HTMLInputElement).value
    records = await apiGallery(search, sort)
    updateUrl()
  }

  const onShow = (e: Event) => {
    show = (e.target as HTMLInputElement).value
    updateUrl()
  }

  const onSort = (e: Event) => {
    sort = (e.target as HTMLInputElement).value
    updateUrl()
  }

  const onDeploy = () => {
    apiGalleryDeploy()
  }

  const onMore = () => (count += chunkSize)

  onMount(async () => {
    records = await apiGallery(search, sort)
  })
</script>

<Header>
  <a href="/gallery.html">Gallery</a>
  <button onclick={onSync}>Sync</button>
  <div class="filter">
    <div class="radio">
      <label for="asc">Asc</label>
      <input type="radio" name="sort" id="asc" value="asc" checked={sort == 'asc'} onchange={onSort} />
    </div>
    <div class="radio">
      <label for="desc">Desc</label>
      <input type="radio" name="sort" id="desc" value="desc" checked={sort == 'desc'} onchange={onSort} />
    </div>
    <input type="text" name="search" placeholder="Search" value={search} onchange={onSearch} />
    <div class="radio">
      <label for="all">All</label>
      <input type="radio" name="show" id="all" value="all" checked={show == 'all'} onchange={onShow} />
    </div>
    <div class="radio">
      <label for="fix">Fix</label>
      <input type="radio" name="show" id="fix" value="fix" checked={show == 'fix'} onchange={onShow} />
    </div>
  </div>
  <button onclick={onDeploy}>Deploy</button>
</Header>
<Main>
  <div class="gallery">
    <div class="count">
      {photos.length}
    </div>
    <Intersect onIntersect={onMore}>
      {#each visiblePhotos as photo}
        <a
          class="photo"
          class:offline={photo.offline}
          class:fix={photo.fix}
          href={`/gallery-photo.html?id=${photo.id}`}
        >
          <div class="thumbnail">
            <img src={photo.imageThumbnail} alt={photo.title} />
          </div>
          <span class="title">{photo.title}</span>
          <span class="description">{photo.description}</span>
          <span class="upload">
            {photo.flickr ? '🟢' : '🔴'}
            {photo.pixelfed ? '🟢' : '🔴'}
          </span>
          <span class="album">{photo.album}</span>
          <span class="datetime">{photo.datetime}</span>
        </a>
      {/each}
    </Intersect>
  </div>
</Main>

<style>
  .filter {
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 16px;
    gap: 8px;
    .radio {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 2px;
    }
  }
  .gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding-bottom: 2px;
    .count {
      position: fixed;
      right: 16px;
      top: 0;
      height: var(--size-header);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--color-primary-light);
    }
    .photo {
      text-decoration: none;
      border-radius: 8px;
      padding: 12px;
      width: 160px;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      gap: 2px;
      background-color: var(--color-dark);
      &.offline {
        opacity: 0.1;
      }
      &.fix {
        border: 1px solid var(--color-error);
      }
      .thumbnail {
        width: 160px;
        height: 140px;
        margin-bottom: 6px;
      }
      .title {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.9rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      .description {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.9rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        opacity: 0.7;
      }
      .album {
        height: 1.1rem;
        line-height: 1.1rem;
        font-size: 0.8rem;
        text-align: center;
        opacity: 0.5;
      }
      .datetime {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.7rem;
        opacity: 0.3;
      }
      .upload {
        font-size: 10px;
      }
    }
  }
</style>
