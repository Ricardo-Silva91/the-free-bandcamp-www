<template>
  <div class="home">
    <AlbumGrid
      :albums="albumstoShow"
      title="Latest Sold Albums On Bandcamp"
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
      // const showVinyl = window.localStorage.getItem('showVinyl') === 'true';

      // return showVinyl ? this.vinylAlbums : this.latestAlbums;
      return this.latestAlbums.filter((album, index) => this.latestAlbums.findIndex((cAlbum) => cAlbum.link === album.link) === index);
    }
  },
};
</script>
