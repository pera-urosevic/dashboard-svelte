import { mount } from 'svelte'
import Gallery from '@pages/gallery/gallery/Gallery.svelte'

const app = mount(Gallery, {
  target: document.getElementById('app')!,
})

export default app
