<template>
  <div class="home">
    <AlbumGrid
      :albums="latestAlbums"
      title="Latest Albums"
      :status="albumsStatus"
    ></AlbumGrid>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import AlbumGrid from "../components/album-grid/AlbumGrid.vue";

export default {
  name: "Home",
  components: {
    AlbumGrid,
  },
  mounted() {
    console.log("home mounted");
  },
  computed: {
    ...mapGetters(["latestAlbums", "albumsStatus"]),
  },
};
</script>
