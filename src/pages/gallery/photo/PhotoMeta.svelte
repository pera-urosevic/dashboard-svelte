<script lang="ts">
  import type { PhotoRecord } from '@pages/gallery/shared/types'
  import { fixCopyright, fixDatetime, fixDescription, fixKeywords, fixTitle, lint } from '@pages/gallery/photo/lint'

  interface Props {
    record: PhotoRecord
    onUpdate: (meta: PhotoRecord) => void
  }
  const { record, onUpdate }: Props = $props()

  let meta = $state(record)
  let warnings = $derived(lint(meta))

  const onTitle = (e: Event) => {
    e.preventDefault()
    meta = { ...meta, title: (e.target as HTMLInputElement).value }
  }

  const onDescription = (e: Event) => {
    e.preventDefault()
    meta = { ...meta, description: (e.target as HTMLInputElement).value }
  }

  const onKeywords = (e: Event) => {
    e.preventDefault()
    meta = { ...meta, keywords: (e.target as HTMLInputElement).value }
  }

  const onDatetime = (e: Event) => {
    e.preventDefault()
    meta = { ...meta, datetime: (e.target as HTMLInputElement).value }
  }

  const onCopyright = (e: Event) => {
    e.preventDefault()
    meta = { ...meta, copyright: (e.target as HTMLInputElement).value }
  }

  const onFixTitle = (e: Event) => {
    e.preventDefault()
    meta = fixTitle(meta)
  }
  const onFixDescription = (e: Event) => {
    e.preventDefault()
    meta = fixDescription(meta)
  }
  const onFixKeywords = (e: Event) => {
    e.preventDefault()
    meta = fixKeywords(meta)
  }
  const onFixDatetime = (e: Event) => {
    e.preventDefault()
    meta = fixDatetime(meta)
  }
  const onFixCopyright = (e: Event) => {
    e.preventDefault()
    meta = fixCopyright(meta)
  }
</script>

<div class="form">
  <label for="title" title={warnings.title} class:warning={warnings.title}>Title</label>
  <input id="title" name="title" type="text" value={meta.title} onchange={onTitle} spellcheck />
  <button disabled={!warnings.title} class="fix" onclick={onFixTitle}>🪄</button>

  <label for="description" title={warnings.description} class:warning={warnings.description}>Description</label>
  <input id="description" name="description" type="text" value={meta.description} onchange={onDescription} spellcheck />
  <button disabled={!warnings.description} class="fix" onclick={onFixDescription}>🪄</button>

  <label for="keywords" title={warnings.keywords} class:warning={warnings.keywords}>Keywords</label>
  <input id="keywords" name="keywords" type="text" value={meta.keywords} onchange={onKeywords} spellcheck />
  <button disabled={!warnings.keywords} class="fix" onclick={onFixKeywords}>🪄</button>

  <label for="datetime" title={warnings.datetime} class:warning={warnings.datetime}>Datetime</label>
  <input id="datetime" name="datetime" type="text" value={meta.datetime} onchange={onDatetime} />
  <button disabled={!warnings.datetime} class="fix" onclick={onFixDatetime}>🪄</button>

  <label for="copyright" title={warnings.copyright} class:warning={warnings.copyright}>Copyright</label>
  <input id="copyright" name="copyright" type="text" value={meta.copyright} onchange={onCopyright} />
  <button disabled={!warnings.copyright} class="fix" onclick={onFixCopyright}>🪄</button>

  &nbsp;
  <button onclick={() => onUpdate(meta)}>Update</button>
</div>

<style>
  .form {
    display: grid;
    justify-content: start;
    align-items: start;
    grid-template-columns: auto 1fr auto;
    gap: 16px;
    row-gap: 8px;
  }
  label {
    height: 36px;
    line-height: 36px;
    &.warning {
      color: var(--color-error);
      text-shadow: 0px 0px 2px var(--color-error);
      cursor: help;
    }
  }
  .fix {
    transform: translateX(-8px);
  }
</style>
