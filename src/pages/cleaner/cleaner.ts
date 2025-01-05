import { mount } from 'svelte'
import Cleaner from '@pages/cleaner/cleaner/Cleaner.svelte'

const app = mount(Cleaner, {
  target: document.getElementById('app')!,
})

export default app
