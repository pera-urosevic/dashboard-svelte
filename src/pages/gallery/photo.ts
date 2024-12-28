import { mount } from 'svelte'
import Photo from '@pages/gallery/photo/Photo.svelte'

const app = mount(Photo, {
  target: document.getElementById('app')!,
})

export default app
