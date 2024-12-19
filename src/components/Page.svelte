<script lang="ts">
  import type { Snippet } from 'svelte'
  import { busy } from '../store'
  import Busy from '@components/Busy.svelte'

  type Props = {
    title: string
    favicon: string
    children: Snippet
  }
  const { title, favicon, children }: Props = $props()
  const faviconUrl = `/favicon${favicon ? `-${favicon}` : ''}.svg`
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="icon" type="image/svg+xml" href={faviconUrl} />
</svelte:head>

{@render children()}

{#if $busy}
  <Busy />
{/if}
