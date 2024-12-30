<script lang="ts">
  import { onMount } from 'svelte'
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import { Category, Template, type PostObject, type PostRecord } from '@pages/blog/shared/types'
  import { parsePostRecord } from '@pages/blog/shared/parse'
  import { apiPost, apiPostRemove, apiPostScrape, apiPostUpdate } from '@pages/blog/shared/api'

  const params = new URLSearchParams(window.location.search)
  const id = Number(params.get('id'))

  let post = $state<PostObject>()

  const onRemove = async () => {
    const res = await apiPostRemove(id)
    if (res) {
      window.location.href = '/blog.html'
    }
  }

  const onScrape = async () => {
    const res = await apiPostScrape(id)
    if (res) {
      post = parsePostRecord(res)
    }
  }

  const onUpdate = async () => {
    const res = await apiPostUpdate(post)
    if (res) {
      post = parsePostRecord(res)
    }
  }

  onMount(async () => {
    const res = await apiPost(id)
    if (res) {
      post = parsePostRecord(res)
    }
  })
</script>

<Header>
  <a href="/blog.html">Blog</a>
  {#if post}
    <button onclick={onRemove}>Remove</button>
  {/if}
</Header>
<Main>
  {#if post}
    <div class="layout">
      <div class="form">
        <label for="url">URL</label>
        <div class="url">
          <input id="url" title="URL" type="text" bind:value={post.url} />
          <button onclick={onScrape}>Scrape</button>
        </div>
        <label for="title">Title</label>
        <input id="title" title="Title" type="text" bind:value={post.title} spellcheck />
        <label for="description">Description</label>
        <textarea id="description" title="Description" bind:value={post.description} spellcheck></textarea>
        <label for="image">Image</label>
        <input disabled id="image" title="Image" type="text" bind:value={post.image} />
        <label for="category">Category</label>
        <select id="category" title="Category" bind:value={post.category}>
          {#each Object.values(Category) as value}
            <option {value}>{value}</option>
          {/each}
        </select>
        <label for="template">Template</label>
        <select id="template" title="Template" bind:value={post.template}>
          {#each Object.entries(Template) as [key, value]}
            <option {value}>{value}</option>
          {/each}
        </select>
        &nbsp;
        <button onclick={onUpdate}>Update</button>
      </div>
      <div class="preview">
        <img src={`${post.imagePost}?ts=${Date.now()}`} alt="" />
      </div>
    </div>
  {/if}
</Main>

<style>
  .layout {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    gap: 16px;
  }
  .form {
    width: 500px;
    flex-shrink: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    row-gap: 8px;
    .url {
      display: flex;
      flex-direction: row;
      gap: 8px;
      input {
        flex-grow: 1;
      }
    }
  }
  .preview {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
    }
  }
</style>
