<template>
  <div class="artist">
    <AlbumGrid :albums="albums" :title="title" :status="albumsStatus"></AlbumGrid>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import AlbumGrid from "../components/album-grid/AlbumGrid.vue";

export default {
  name: "Artist",
  components: {
    AlbumGrid,
  },
  data: () => ({
    page: Math.floor(Math.random() * 50),
  }),
  mounted() {
    if(!this.albums.length) {
      this.$store.dispatch("getAlbumsFromRemoteByArtist", this.title);
    }
  },
  computed: {
    ...mapGetters(["latestAlbums", "albumsStatus"]),
    albums() {
      return this.$store.getters.albumsByArtist(this.title);
    },
    title() {
      return `${this.$route.params.id}`;
    },
  },
};
</script>
