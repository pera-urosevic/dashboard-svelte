import { mount } from 'svelte'
import DJ from '@pages/dj/dj/DJ.svelte'

const app = mount(DJ, {
  target: document.getElementById('app')!,
})

export default app
