<template>
  <div class="album-grid">
    <h2>
      {{ title }}
    </h2>
    <div v-if="status === 'ready' && albums.length" class="album-grid__sort-filter">
      <CrispyButton @click="sortToggle()">sort: {{sort}}</CrispyButton>
      <CrispyButton @click="vinylToggle()">vinyl filter: {{filterByVinyl}}</CrispyButton>
      <CrispySelect :options="tags" label="Tags (alphabetically)" v-model="selectedFilterTag" placeholder="pick a tag..."></CrispySelect>
      <CrispySelect :options="popularTags" label="Tags (popularity)" v-model="selectedFilterTag" placeholder="pick a tag..."></CrispySelect>
    </div>
    <div class="album-grid__grid" v-if="status === 'ready' && albums.length">
      <Album
        class="album-grid__cell"
        v-for="(album, index) in albumsToShow"
        :album="album"
        :key="index"
        :revealTimeout="index < jump ? index * 300 : 0"
        @tagClick="handleAlbumTagClick($event)"
      />
      <div v-if="mounted" ref="target"></div>
    </div>
    <div v-if="status === 'loading'" class="album-grid__loader-box">
      <CrispyLoader class="album-grid__loader" />
    </div>
  </div>
</template>

<script>
import { useElementVisibility } from "@vueuse/core";
// import { ref } from "vue";
import Album from "../Album/Album.vue";
import CrispyLoader from "../crispy-ui/src/components/loader/CrispyLoader.vue";
import CrispyButton from "../crispy-ui/src/components/button/CrispyButton.vue";
import CrispySelect from "../crispy-ui/src/components/select/CrispySelect.vue";

export default {
  name: "AlbumGrid",
  data: () => ({
    numberOfAlbumsToShow: 12,
    jump: 12,
    bottomIsVisible: false,
    mounted: false,
    filterByVinyl: false,
    sort: 'asc',
    selectedFilterTag: undefined,
  }),
  props: {
    title: String,
    albums: Array,
    status: String,
  },
  components: { Album, CrispyLoader, CrispyButton, CrispySelect },
  mounted() {
    this.mounted = true;
     this.$nextTick(() => {
        this.setupIntersectionObserver();
      });
  },
  computed: {
    albumsToShow() {
      let albumArray = this.filterByVinyl ? [...this.albums.filter((album) => album.availableInVinyl === 'TRUE')] : [...this.albums];
      albumArray = this.sort === 'asc' ? albumArray : albumArray.reverse();
      
      if (this.selectedFilterTag) {
        albumArray = albumArray.filter((album) => album.tags.includes(this.selectedFilterTag));
      }

      return albumArray.slice(0, this.numberOfAlbumsToShow);
    },
    tags() {
      const allTags = [...this.albumsToShow].reduce((acc, album) => [...acc, ...((album.tags || []).filter((tag) => !acc.includes(tag)) || [])], []).sort();

      return allTags;
    },
    popularTags() {
      const commonTags = [...this.albumsToShow].reduce((acc, album) => {
        const albumTags = album.tags || [];

        for (const tag of albumTags) {
          const tagIndex = acc.findIndex((tagObject) => tagObject.tag === tag);

          if (tagIndex !== -1) {
            acc[tagIndex].count = acc[tagIndex].count + 1;
          } else {
            acc.push({ tag, count: 1 });
          }
        }

        return acc;
      }, []).sort((a, b) => a.count > b.count ? -1 : 1);

      return commonTags.map((tagObject) => tagObject.tag);
    },
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
    },
    vinylToggle() {
      this.filterByVinyl = !this.filterByVinyl;
      this.numberOfAlbumsToShow = this.jump;
    },
    handleAlbumTagClick(tag) {
      if (this.tags.includes(tag)) {
        this.selectedFilterTag = tag;
      }
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

  &__sort-filter {
    margin: calc($space-base * 2);
    display: flex;
    justify-content: space-between;
  }
}
</style>
