<script lang="ts">
  import type { EntryNode } from '@pages/cleaner/shared/types'
  import Node from './Node.svelte'

  type Props = {
    node: EntryNode
    indent: number
    path: string
  }
  let { node, indent, path }: Props = $props()

  const nodeURL = (node: EntryNode) => {
    const p = [path, node.entry.name].join('/')
    return `/cleaner.html#${encodeURIComponent(p)}`
  }
</script>

<div class="node">
  <div class="details" title={node.entry.name}>
    <div class="name">
      <a href={nodeURL(node)}>{path}/{node.entry.name}</a>
    </div>
    <div class="size">[{node.entry.size}]</div>
    <div class="modified">({node.entry.modified})</div>
  </div>
  {#each node.children as child}
    <Node node={child} indent={indent + 1} path={path + '/' + node.entry.name} />
  {/each}
</div>

<style>
  .node {
    display: flex;
    flex-direction: column;
    .details {
      font-family: var(--font-family-mono);
      font-size: 14px;
      display: flex;
      flex-direction: row;
      align-items: baseline;
      gap: 16px;
      .name {
        a {
          white-space: nowrap;
          &:hover {
            background-color: var(--color-secondary-dark);
            color: var(--color-light);
          }
        }
      }
      .size {
        white-space: nowrap;
        opacity: 0.5;
      }
      .modified {
        white-space: nowrap;
        opacity: 0.25;
      }
    }
  }
</style>
