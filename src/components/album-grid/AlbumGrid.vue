<template>
  <div class="album-grid">
    <h2>
      album-grid
    </h2>
    <div class="album-grid__grid">
      <Album class="album-grid__cell" v-for="(album, index) in latestAlbums" :album="album" :key="index"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Album from '../Album/Album.vue';

export default {
    name: "AlbumGrid",
    props: {},
    computed: {
        ...mapGetters([
            "latestAlbums"
        ])
    },
    components: { Album }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.album-grid {
  border: 1px solid black;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }

  &__cell {
    height: 10rem;
  }
}
</style>
