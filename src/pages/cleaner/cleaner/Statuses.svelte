<script lang="ts">
  import { Status, type Entry } from '@pages/cleaner/shared/types'

  type Props = {
    entry: Entry
    onAdd: (entry: Entry, status: Status) => void
    onRemove: (entry: Entry) => void
  }
  const { entry, onAdd, onRemove }: Props = $props()

  const onRemoveEntry = () => {
    onRemove(entry)
  }

  const onDirtyEntry = () => {
    onAdd(entry, Status.Dirty)
  }

  const onCleanEntry = () => {
    onAdd(entry, Status.Clean)
  }
</script>

<div class="status">
  <button disabled={entry.status === Status.Unknown} onclick={onRemoveEntry}>❓</button>
  <button disabled={entry.status === Status.Dirty} onclick={onDirtyEntry}>🚮</button>
  <button disabled={entry.status === Status.Clean} onclick={onCleanEntry}>☑️</button>
</div>

<style>
  .status {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
    button {
      background-color: transparent;
      border: none;
      font-size: 16px;
      width: 24px;
      height: 24px;
      padding: 0;
      opacity: 0.01;
      &:disabled {
        opacity: 1;
      }
      &:hover:not(:disabled) {
        opacity: 1;
        filter: saturate(0);
      }
    }
  }
</style>
