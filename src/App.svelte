<script lang="ts">
  import Blog from '@pages/blog/Blog.svelte'
  import Post from '@pages/blog/Post.svelte'
  import DJ from '@pages/dj/DJ.svelte'
  import Gallery from '@pages/gallery/Gallery.svelte'
  import Photo from '@pages/gallery/Photo.svelte'
  import Home from '@pages/home/Home.svelte'
  import Micron from '@pages/micron/Micron.svelte'
  import { onMount } from 'svelte'

  type Route = Record<string, string>

  const parseRoute = (hash: string) => {
    const routeNew = hash
      .replace('#', '')
      .split('&')
      .reduce<Route>((map, part) => {
        const [key, value] = part.split('=')
        if (key) map[key] = decodeURIComponent(value)
        return map
      }, {})
    return routeNew
  }

  onMount(() => {
    addEventListener('hashchange', (e) => {
      const url = new URL(e.newURL)
      route = parseRoute(url.hash)
    })
  })

  let route = $state<Route>(parseRoute(window.location.hash))
</script>

{#if !route.page || route.page === 'home'}
  <Home />
{/if}

{#if route.page === 'dj'}
  <DJ />
{/if}

{#if route.page === 'micron'}
  <Micron />
{/if}

{#if route.page === 'blog'}
  {#if route.postID}
    <Post id={Number(route.postID)} />
  {:else}
    <Blog />
  {/if}
{/if}

{#if route.page === 'gallery'}
  {#if route.photoID}
    <Photo id={Number(route.photoID)} />
  {:else}
    <Gallery search={route.search} show={route.show} />
  {/if}
{/if}
