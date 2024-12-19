<script lang="ts">
  import { apiPhotoOpen } from '@pages/gallery/api'

  interface Props {
    url: string
    path: string
  }
  const { url, path }: Props = $props()

  const onOpen = () => {
    apiPhotoOpen(path)
  }
</script>

<button class="preview" onclick={onOpen} title={path}>
  <img src={url} alt="" />
</button>

<style>
  .preview {
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: start;
    cursor: pointer;
    border-radius: 0;
    border: none;
    background-color: transparent;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
