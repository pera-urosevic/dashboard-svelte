<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount, type Snippet } from 'svelte'
  
  interface Props {
    children: Snippet;
    onIntersect: (entry: IntersectionObserverEntry) => void
  }
  let { children, onIntersect }: Props = $props();

  let root: HTMLElement | undefined = $state()

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onIntersect(entry)
    })
  })

  onMount(() => {
    if (root) observer.observe(root)
    
  })

  onDestroy(() => {
    observer.disconnect()
  })
</script>

{@render children?.()}
<div class="root" bind:this={root}>&nbsp;</div>

<style>
  .root {
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
</style>
