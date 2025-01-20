<script lang="ts">
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import { apiUnknown } from '@pages/cleaner/shared/api'
  import type { EntryNode } from '@pages/cleaner/shared/types'
  import Node from '@pages/cleaner/unknown/Node.svelte'
  import { onMount } from 'svelte'

  let unknown = $state<EntryNode[]>([])

  onMount(async () => {
    const data = await apiUnknown()
    if (!data) return
    unknown = data
  })
</script>

<Header>
  <a href="/cleaner.html">Cleaner</a>
</Header>
<Main>
  {#each unknown as node}
    <Node {node} indent={0} path="" />
  {/each}
</Main>
