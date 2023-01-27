<template>
  <div
    :class="{
      album: true,
      'album--visible': visible,
    }"
  >
    <!-- <div
      :class="{
        album__link: true,
        'supress-interaction': true,
        'album__link--visible': visible,
      }"
      :href="album.url"
      target="_blank"
    >
      <div class="album__img-layer">
        <img class="album__img" :src="album.art_url" :alt="album.item_description" />
      </div>
      <iframe class="album__embed" :src="embedUrl" seamless ref="embedFrame"
        ><a :href="album.url">{{ album.item_description }}</a></iframe
      >
    </div> -->
    <a
      :class="{
        album__link: true,
        'supress-interaction': true,
        'album__link--visible': visible,
      }"
      :href="album.link"
      target="_blank"
    >
      <div class="album__img-layer">
        <img class="album__img" :src="album.cover" :alt="album.description" />
      </div>
    </a>
    <div class="album__data-layer">
      <a :href="album.link" target="_blank"><h2>{{ album.title }}</h2></a>
      <router-link
        :to="{
          name: 'Artist',
          params: { id: album.artist },
        }"
        exact
        ><h3>{{ album.artist }}</h3></router-link
      >
      <!-- <div class="album__data-layer__tags" v-if="tags.length">
        <div
          v-for="tag of tags"
          class="album__data-layer__tags__tag"
          :key="tag"
          @click="$emit('tagClick', tag)"
        >
          {{ tag }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Album",
  props: {
    album: Object,
    revealTimeout: {
      type: Number,
      default: 100,
    },
  },
  data: () => ({
    visible: false,
  }),
  mounted() {
    setTimeout(() => {
      this.visible = true;
    }, this.revealTimeout);
  },
  computed: {
    artistLink() {
      return `/artist/${encodeURI(this.album.artist)}`;
    },
    tags() {
      return this.album.tags || [];
    },
    embedUrl() {
      return `https://bandcamp.com/EmbeddedPlayer/album=${this.albumId}/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/`;
    },
    albumId() {
      return this.album.link;
    },
  },
  watch: {
    embedFrame(newVal, oldVal) {
      console.log({ newVal, oldVal });
    },
  },
};
</script>

<style scoped lang="scss">
$data-height: $space-one;

.album {
  position: relative;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: $border-radius;
  
  & a {
    color: $color-gainsboro;
  }

  &--visible {
    @extend .with-float-animation;
  }

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus-visible {
    filter: $focus-visible-drop-filter;
  }

  &:hover {
    & .album__data-layer {
      opacity: 1;
      visibility: visible;
    }

    & .album__img-layer {
      opacity: 0.5;
    }
  }

  &__link {
    position: relative;
    // cursor: pointer;

    width: 100%;
    height: 100%;

    opacity: 0;
    visibility: hidden;

    transition: all $motion-duration-standard $motion-timing-standard,
      opacity $motion-duration-very-slow $motion-timing-standard;

    &--visible {
      opacity: 1;
      visibility: visible;
    }
  }

  &__img-layer {
    width: 100%;
    height: 100%;
    transition: all $motion-duration-standard $motion-timing-standard;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__data-layer {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: all $motion-duration-standard $motion-timing-standard;
    pointer-events: none;

    color: $color-white;

    background-color: black;
    mix-blend-mode: color;

    & > * {
      pointer-events: all;
    }

    &__tags {
      display: flex;
      max-width: 100%;
      flex-wrap: wrap;
      gap: 0.2rem;
      justify-content: center;

      &__tag {
        cursor: pointer;
      }
    }
  }

  &__embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 4px);
    border: none;
  }
}
</style>
