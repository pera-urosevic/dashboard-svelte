import { mount } from 'svelte'
import Index from './index/Index.svelte'

const app = mount(Index, {
  target: document.getElementById('app')!,
})

export default app
