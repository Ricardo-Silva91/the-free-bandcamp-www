<template>
  <div class="artist">
    <AlbumGrid :albums="latestAlbums" :title="title" :status="albumsStatus"></AlbumGrid>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import AlbumGrid from "../components/album-grid/AlbumGrid.vue";

export default {
  name: "Artist",
  components: {
    AlbumGrid
  },
  computed: {
      ...mapGetters([
          "latestAlbums",
          "albumsStatus"
      ]),
    title() {
      return `${this.$route.params.id}`
    }
  },
};
</script>
