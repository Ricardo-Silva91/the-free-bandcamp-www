<template>
  <div class="home">
    <AlbumGrid></AlbumGrid>
    
  </div>
</template>

<script>
// @ is an alias to /src
import AlbumGrid from "../components/album-grid/AlbumGrid.vue";

export default {
  name: "Home",
  components: {
    AlbumGrid
},
};
</script>
