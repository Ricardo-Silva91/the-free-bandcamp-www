<template>
  <div class="home">
    <AlbumGrid
      :albums="albumstoShow"
      title="Latest Sold Albums"
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
  mounted() {},
  computed: {
    ...mapGetters(["latestAlbums", "albumsStatus", "vinylAlbums"]),
    albumstoShow() {
      const showVinyl = window.localStorage.getItem('showVinyl') === 'true';

      console.log({ showVinyl });

      return showVinyl ? this.vinylAlbums : this.latestAlbums;
    }
  },
};
</script>
