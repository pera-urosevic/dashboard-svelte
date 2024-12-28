import { mount } from 'svelte'
import Micron from '@pages/micron/micron/Micron.svelte'

const app = mount(Micron, {
  target: document.getElementById('app')!,
})

export default app
