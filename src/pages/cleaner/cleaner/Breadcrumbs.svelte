<script lang="ts">
  type Props = {
    path: string
    onPath: (path: string) => void
    onOpen: (path: string) => void
  }

  const { path, onPath, onOpen }: Props = $props()

  type Breadcrumb = {
    label: string
    path: string
  }

  let breadcrumbs = $derived.by<Breadcrumb[]>(() => {
    let t = ''
    const temp: Breadcrumb[] = path
      .split('/')
      .filter((part) => part)
      .map((part) => {
        t = [t, part].join('/')
        return { label: part, path: t }
      })
    return temp
  })
</script>

<div class="breadcrumbs">
  <button onclick={() => onPath('/')}>🏠</button>
  {#each breadcrumbs as breadcrumb}
    <button onclick={() => onPath(breadcrumb.path)}>{breadcrumb.label}</button>
  {/each}
  <button onclick={() => onOpen(path)}>📂</button>
</div>

<style>
  .breadcrumbs {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
  }
</style>
