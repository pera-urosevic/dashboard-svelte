import { mount } from 'svelte'
import Unknown from '@pages/cleaner/unknown/Unknown.svelte'

const app = mount(Unknown, {
  target: document.getElementById('app')!,
})

export default app
