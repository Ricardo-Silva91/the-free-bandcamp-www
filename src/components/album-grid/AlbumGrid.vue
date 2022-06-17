<template>
  <div class="album-grid">
    <h2>
      {{ title }}
      <Button @click="sortToggle()">sort: {{sort}}</Button>
    </h2>
    <div class="album-grid__grid" v-if="status === 'ready' && albums.length">
      <Album
        class="album-grid__cell"
        v-for="(album, index) in albumsToShow"
        :album="album"
        :key="index"
        :revealTimeout="index < jump ? index * 300 : 0"
      />
      <div v-if="mounted" ref="target"></div>
    </div>
    <div v-if="status === 'loading'" class="album-grid__loader-box">
      <Loader class="album-grid__loader" />
    </div>
  </div>
</template>

<script>
import { useElementVisibility } from "@vueuse/core";
// import { ref } from "vue";
import Album from "../Album/Album.vue";
import Loader from "../crispy-ui/src/components/loader/Loader.vue";
import Button from "../crispy-ui/src/components/button/Button.vue";

export default {
  name: "AlbumGrid",
  data: () => ({
    numberOfAlbumsToShow: 12,
    jump: 12,
    bottomIsVisible: false,
    mounted: false,
    sort: 'asc',
  }),
  props: {
    title: String,
    albums: Array,
    status: String,
  },
  components: { Album, Loader, Button },
  mounted() {
    this.mounted = true;
     this.$nextTick(() => {
        this.setupIntersectionObserver();
      });
  },
  computed: {
    albumsToShow() {
      let albumArray = [...this.albums];
      albumArray = this.sort === 'asc' ? albumArray : albumArray.reverse();

      return albumArray.slice(0, this.numberOfAlbumsToShow);
    }
  },
  methods: {
    setupIntersectionObserver() {
      const target = this.$refs.target;

      if (target) {
        this.bottomIsVisible = useElementVisibility(target);
      }
    },
    handleIntersectEnter() {
      this.numberOfAlbumsToShow = this.numberOfAlbumsToShow + this.jump;
    },
    sortToggle() {
      this.sort = this.sort === 'asc' ? 'desc' : 'asc';
      this.numberOfAlbumsToShow = this.jump;
    }
  },
  watch: {
    bottomIsVisible(now, prev) {
      if (now && !prev) {
        this.handleIntersectEnter();
      }
    },
    status(now, prev) {
      if (now === "ready" && prev === "loading") {
        this.$nextTick(() => {
          this.setupIntersectionObserver();
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.album-grid {
  width: 100%;
  min-height: 101vh;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: calc($space-base * 2);
    margin: calc($space-base * 2);
  }

  &__loader-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: calc($space-base * 2);
  }

  &__loader {
    height: 5rem;
    width: 5rem;
  }

  &__cell {
    width: 100%;
    height: 100%;
    max-height: 25rem;
  }
}
</style>
