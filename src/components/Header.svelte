<script lang="ts">
  import type { Snippet } from 'svelte'
  import { busy } from '../services/store'
  import Busy from '@components/Busy.svelte'

  type Props = {
    children?: Snippet
  }
  const { children }: Props = $props()
</script>

<header class="header">
  <a class="home" href="/index.html">Admin</a>
  {@render children?.()}
</header>

{#if $busy}
  <Busy />
{/if}

<style>
  .header {
    position: sticky;
    top: 0;
    height: var(--size-header);
    padding: 0 16px;
    background-color: var(--color-primary-dark);
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 16px;
    font-size: 20px;
    font-weight: 500;
  }
</style>
