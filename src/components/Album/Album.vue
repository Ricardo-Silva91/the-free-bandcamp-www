<template>
  <div class="album">
    <img class="album__img" :src="album.art_url" :alt="album.item_description">
    <div class="album__data">
      <a :href="album.url" target="_blank">{{ album.item_description }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Album',
  props: {
    album: Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$data-height: 1rem;

.album {
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__img {
    max-width: 100%;
    max-height: calc(100% - $data-height);
    object-fit: cover;
  }

  &__data {
    height: $data-height;
  }
}
</style>
