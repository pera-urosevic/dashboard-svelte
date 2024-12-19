<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    children?: Snippet
  }
  const { children }: Props = $props()
</script>

<main class="main">
  {@render children?.()}
</main>

<style>
  .main {
    position: fixed;
    top: calc(var(--size-header) + 16px);
    left: 16px;
    right: 16px;
    bottom: 16px;
    overflow: auto;
  }
</style>
