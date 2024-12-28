<script lang="ts">
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import { onMount } from 'svelte'
  import type { PostObject } from '@pages/blog/shared/types'
  import Intersect from '@components/Intersect.svelte'
  import { apiBlogDeploy, apiPostCreate, apiBlog } from '@pages/blog/shared/api'

  const chunkSize = 7 * 4

  let search = $state<string>('')
  let posts = $state<PostObject[]>([])
  let count = $state(chunkSize)
  let visiblePosts = $derived(posts.slice(0, count))

  const onMore = () => (count += chunkSize)

  const fetchPosts = async () => {
    const res = await apiBlog(search)
    if (!res) return
    posts = res
  }

  const onSearch = (e: Event) => {
    search = (e.target as HTMLInputElement).value
    fetchPosts()
  }

  const onCreate = async () => {
    const url = prompt('URL')
    if (!url) return
    const id = await apiPostCreate(url)
    if (!id) return
    window.location.href = `/blog-post.html?id=${id}`
  }

  const onDeploy = async () => {
    await apiBlogDeploy()
  }

  onMount(() => {
    fetchPosts()
  })
</script>

<Header>
  <a href="/blog.html">Blog</a>
  <input placeholder="Search" value={search} onchange={onSearch} />
  <button class="create" onclick={onCreate}>Create</button>
  <button class="deploy" onclick={onDeploy}>Deploy</button>
</Header>
<Main>
  <div class="posts">
    <div class="count">
      {posts.length}
    </div>
    <Intersect onIntersect={onMore}>
      {#each visiblePosts as post}
        <a class="post" class:draft={post.status === 'Draft'} href={`/blog-post.html?id=${post.id}`}>
          <img class="thumbnail" src={post.imageThumbnail} alt={post.title} />
          <span class="title">{post.title}</span>
          <span class="datetime">{post.datetime}</span>
        </a>
      {/each}
    </Intersect>
  </div>
</Main>

<style>
  .count {
    position: fixed;
    right: 16px;
    top: 0;
    height: var(--size-header);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-primary-light);
  }
  .posts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
  .post {
    text-decoration: none;
    border-radius: 8px;
    background-color: var(--color-dark);
    padding: 12px;
    width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 2px;
    &.draft {
      background-color: var(--color-secondary-dark);
      > * {
        opacity: 0.5;
      }
    }
  }
  .thumbnail {
    margin-bottom: 6px;
  }
  .title {
    font-size: 0.9rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .datetime {
    font-size: 0.75rem;
  }
</style>
