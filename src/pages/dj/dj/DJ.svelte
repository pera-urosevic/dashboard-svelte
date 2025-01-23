<script lang="ts">
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import { apiQueries, apiQuery, apiSearch, apiSync } from '@pages/dj/shared/api'
  import type { Queries, Results, Sync } from '@pages/dj/shared/types'
  import { onMount } from 'svelte'

  let queryEditor = $state<string>('')
  let queries = $state<Queries>([])
  let querySelected = $state<string>()
  let search = $state<string>()
  let results = $state<Results>()
  let sync = $state<Sync>()

  const onQuerySelect = async (e: Event) => {
    querySelected = (e.target as HTMLSelectElement).value
  }

  const onQuery = async (e: Event) => {
    e.preventDefault()
    if (!querySelected) return
    sync = undefined
    results = await apiQuery(querySelected)
    results.sort((a, b) => a.path.localeCompare(b.path))
  }

  const onSearchInput = async (e: Event) => {
    search = (e.target as HTMLInputElement).value
  }

  const onSearch = async (e: Event) => {
    e.preventDefault()
    if (!search) return
    sync = undefined
    results = await apiSearch(search)
    results.sort((a, b) => a.path.localeCompare(b.path))
  }

  const onSync = async (e: Event) => {
    e.preventDefault()
    results = undefined
    sync = await apiSync()
    sync.removed.sort((a, b) => a.localeCompare(b))
    sync.added.sort((a, b) => a.localeCompare(b))
  }

  onMount(async () => {
    queries = await apiQueries()
    if (queries) {
      querySelected = Object.keys(queries)[0]
    }
    queryEditor = JSON.stringify(queries, null, 2)
  })
</script>

<Header>
  <a href="/dj.html">DJ</a>
</Header>
<Main>
  {#if queries}
    <div class="container">
      <div class="actions">
        <form onsubmit={onSync}>
          <button type="submit">Sync</button>
        </form>
        <form onsubmit={onSearch}>
          <input oninput={onSearchInput} value={search} />
          <button type="submit">Search</button>
        </form>
        <form onsubmit={onQuery}>
          <select oninput={onQuerySelect} value={querySelected}>
            {#each queries as query}
              <option value={query.name}>{query.name}</option>
            {/each}
          </select>
          <button type="submit">Query</button>
        </form>
      </div>
      {#if results}
        {#if results.length === 0}
          Nothing found
        {:else}
          <div class="results">
            {#each results as result}
              <details class="result">
                <summary class="path">[{result.query}] {result.path}</summary>
                <div class="meta">
                  {#each Object.entries(result.meta) as [key, value]}
                    <div class="key">
                      {key}
                    </div>
                    <div class="value">
                      {JSON.stringify(value, null, 2)}
                    </div>
                  {/each}
                </div>
                <div class="datetime">{result.datetime}</div>
              </details>
            {/each}
          </div>
        {/if}
      {/if}
      {#if sync}
        {#if sync.removed.length === 0 && sync.added.length === 0}
          Nothing to sync
        {:else}
          <div class="sync">
            {#each Object.entries(sync) as [key, value]}
              <div>
                <div class="group">{key}</div>
                <div class="items">
                  {#each value as item}
                    <div class="item">
                      {item}
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
  {/if}
</Main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .actions {
    display: flex;
    flex-direction: row;
    gap: 32px;
    form {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
    }
  }
  .results {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .result {
    font-family: 'Consolas', monospace;
    .path {
      cursor: pointer;
      background-color: var(--color-secondary-darker);
      padding: 12px;
      border-radius: 8px;
    }
    .meta {
      white-space: pre;
      margin: 0 8px 4px 32px;
      border-bottom: 1px solid var(--color-secondary-dark);
      padding: 8px 0;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;
      overflow: clip;
    }
    .datetime {
      margin: 4px 8px 4px 32px;
    }
  }
  .sync {
    display: flex;
    flex-direction: column;
    gap: 32px;
    .group {
      font-weight: bold;
      text-transform: capitalize;
      background-color: var(--color-secondary-darker);
      padding: 4px 8px;
      margin-bottom: 4px;
      border-radius: 8px;
    }
    .items {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-left: 8px;
    }
  }
</style>
