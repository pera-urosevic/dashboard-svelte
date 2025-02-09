<script lang="ts">
  import type { PhotoRecord } from '@pages/gallery/shared/types'

  type Props = {
    record: PhotoRecord
  }
  const { record }: Props = $props()

  const onCopy = (e: Event) => {
    e.preventDefault()
    const text = (e.target as HTMLAnchorElement).innerText
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'absolute'
      textarea.style.left = '-99999999px'
      document.body.prepend(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
      } catch (err) {
        console.log(err)
      } finally {
        textarea.remove()
      }
    }
  }
</script>

<div class="section">Flickr</div>
<div class="info">
  <div class="label">Path</div>
  <a href="#copy" class="copy" onclick={onCopy}>{record.path}</a>
  <div class="label">Title</div>
  <a href="#copy" class="copy" onclick={onCopy}>{record.title}</a>
  <div class="label">Description</div>
  <a href="#copy" class="copy" onclick={onCopy}>{record.description}</a>
  <div class="label">Tags</div>
  <a href="#copy" class="copy" onclick={onCopy}>{record.keywords.split(' | ').join(' ')}</a>
  <div class="label">Album</div>
  <a href="#copy" class="copy" onclick={onCopy}>{record.album}</a>
</div>

<div class="section">Pixelfed</div>
<div class="info">
  <div class="label">Path</div>
  <a href="#copy" class="copy" onclick={onCopy}>{record.path}</a>
  <div class="label">Caption</div>
  <a href="#copy" class="copy" onclick={onCopy}>
    {record.title}
    <br />
    {record.keywords
      .split(' | ')
      .map((tag) => `#${tag.replaceAll(' ', '')}`)
      .join(' ')}
  </a>
  <div class="label">Collection</div>
  <a href="#copy" class="copy" onclick={onCopy}>{record.album}</a>
</div>

<style>
  .section {
    margin-top: 32px;
    margin-bottom: 4px;
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--color-primary);
  }
  .info {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    row-gap: 8px;
    .label {
      opacity: 0.4;
    }
    .copy {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
</style>
