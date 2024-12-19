<script lang="ts">
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import Page from '@components/Page.svelte'
  import { apiStatus, apiPause, apiResume, apiConfig, apiConfigUpdate } from '@pages/micron/api'
  import type { Task, Config } from '@pages/micron/types'
  import { onMount } from 'svelte'

  let enabled = $state<boolean | undefined>()
  let config = $state<Config | undefined>()
  let groupSelected = $state<keyof Config | undefined>()
  let taskSelected = $state<Task | undefined>()
  let taskEditing = $state<string | undefined>()
  let changed = $state<boolean>(false)

  onMount(async () => {
    enabled = await apiStatus()
    config = await apiConfig()
  })

  const onToggleMicron = async () => {
    if (enabled === undefined) {
      return
    }
    if (enabled === true) {
      enabled = await apiPause()
      return
    }
    if (enabled === false) {
      enabled = await apiResume()
      return
    }
  }

  const onAdd = async (group: string) => {
    if (!config) return
    switch (group) {
      case 'monitor':
        config.monitor.push({
          name: '<New Monitor Task>',
          enabled: false,
          cmd: '',
          args: [],
          match: { cmd: '', regex: '' },
        })
        break
      case 'daily':
        config.daily.push({
          name: '<New Daily Task>',
          enabled: false,
          cmd: '',
          args: [],
          net: true,
          time: '10:00',
          lastRun: '1970-01-01T00:00:00.000Z',
        })
        break
      case 'weekly':
        config.weekly.push({
          name: '<New Weekly Task>',
          enabled: false,
          cmd: '',
          args: [],
          net: true,
          time: '10:00',
          day: 'Friday',
          lastRun: '1970-01-01T00:00:00.000Z',
        })
        break
    }
    groupSelected = undefined
    taskSelected = undefined
    taskEditing = undefined
    changed = false
    await apiConfigUpdate(config)
  }

  const onRemove = async (group: keyof Config, task: Task) => {
    if (!config) return
    const confirm = window.confirm(`Are you sure you want to remove ${task.name}?`)
    if (!confirm) return
    const index = config[group].indexOf(task as any)
    config[group].splice(index, 1)
    await apiConfigUpdate(config)
    groupSelected = undefined
    taskSelected = undefined
    taskEditing = undefined
    changed = false
  }

  const onEdit = (group: keyof Config, task: Task) => {
    changed = false
    groupSelected = group
    taskSelected = task
    taskEditing = JSON.stringify(task, null, 2)
  }

  const onTask = (e: Event) => {
    changed = true
    const textareas = e.target as HTMLTextAreaElement
    taskEditing = textareas.value
  }

  const onSave = async () => {
    if (!config || !taskSelected || !taskEditing || !groupSelected) return
    config[groupSelected] = config[groupSelected].map((task) => {
      if (task === taskSelected) {
        return JSON.parse(taskEditing!)
      }
      return task
    })
    await apiConfigUpdate(config)
    groupSelected = undefined
    taskSelected = undefined
    taskEditing = undefined
    changed = false
  }
</script>

<Page title="Micron" favicon="micron">
  <Header>
    <a href="#page=micron">Micron</a>
    {#if enabled !== undefined}
      <button onclick={onToggleMicron}>{enabled ? 'Enabled' : 'Disabled'}</button>
    {/if}
  </Header>
  <Main>
    {#if config}
      <div class="grid">
        <div class="list">
          {#each Object.entries(config) as [group, tasks]}
            <div class="group">
              <div class="title">{group}</div>
              {#each tasks as task}
                <div class="task">
                  <button onclick={() => onEdit(group as keyof Config, task)}>{task.name}</button>
                  <button onclick={() => onRemove(group as keyof Config, task)}>🗑️</button>
                </div>
              {/each}
              <button onclick={() => onAdd(group)}>➕</button>
            </div>
          {/each}
        </div>
        <div class="editor">
          {#if taskEditing}
            <textarea spellcheck="false" value={taskEditing} oninput={onTask}></textarea>
            <button disabled={!changed} onclick={onSave}>Save</button>
          {/if}
        </div>
      </div>
    {/if}
  </Main>
</Page>

<style>
  .grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .title {
    font-weight: bold;
    text-transform: capitalize;
  }
  .task {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 4px;
    button:first-child {
      flex-grow: 1;
    }
  }
  .editor {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    textarea {
      font-family: 'Consolas', monospace;
      font-size: 16px;
      height: 380px;
      resize: none;
    }
    button {
      margin-top: 2px;
    }
  }
</style>
