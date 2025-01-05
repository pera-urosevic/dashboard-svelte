<script lang="ts">
  import type { Entry } from '@pages/cleaner/shared/types'

  type Props = {
    entry: Entry
    onAdd: (entry: Entry) => void
    onRemove: (entry: Entry) => void
  }
  const { entry, onAdd, onRemove }: Props = $props()

  const onOK = () => {
    onAdd(entry)
  }

  const onNotOK = () => {
    onRemove(entry)
  }
</script>

<div class="status">
  {#if entry.ok > 0}
    <button onclick={onNotOK}> ☑️ </button>
  {:else}
    <button onclick={onOK}>❓</button>
  {/if}
</div>

<style>
  .status {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
  }
</style>
