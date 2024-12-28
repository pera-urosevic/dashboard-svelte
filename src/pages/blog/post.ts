import { mount } from 'svelte'
import Post from './post/Post.svelte'

const app = mount(Post, {
  target: document.getElementById('app')!,
})

export default app
