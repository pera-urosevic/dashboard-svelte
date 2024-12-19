<script lang="ts">
  import Header from '@components/Header.svelte'
  import Main from '@components/Main.svelte'
  import Page from '@components/Page.svelte'
</script>

<Page title="Home" favicon="">
  <Header />
  <Main>
    <a class="page" href="#page=blog">Blog</a>
    <a class="page" href="#page=gallery">Gallery</a>
    <a class="page" href="#page=micron">Micron</a>
    <a class="page" href="#page=dj">DJ</a>
  </Main>
</Page>

<style>
  .page {
    font-size: 20px;
    line-height: 36px;
    display: block;
  }
</style>
