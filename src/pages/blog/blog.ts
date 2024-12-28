import { mount } from 'svelte'
import Blog from './blog/Blog.svelte'

const app = mount(Blog, {
  target: document.getElementById('app')!,
})

export default app
