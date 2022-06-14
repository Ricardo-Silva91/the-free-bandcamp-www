<template>
  <div class="album">
    <a
      :class="{
        album__link: true,
        'album__link--visible': visible,
      }"
      :href="album.url"
      target="_blank"
    >
      <div class="album__img-layer">
        <img class="album__img" :src="album.art_url" :alt="album.item_description" />
      </div>
      <div class="album__data-layer">
        <span>{{ album.artist_name }}</span>
        <a :href="album.url" target="_blank">{{ album.item_description }}</a>
        <router-link
          :to="{
            'name': 'Artist',
            'params': { 'id': album.artist_name }
          }"
          exact
          >{{ album.artist_name }}</router-link
        >
      </div>
    </a>
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
      return `/artist/${encodeURI(this.album.artist_name)}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  &__link {
    position: relative;
    cursor: pointer;

    width: 100%;
    height: 100%;

    opacity: 0;
    visibility: hidden;

    transition: all $motion-duration-standard $motion-timing-standard,
      opacity $motion-duration-very-slow $motion-timing-standard;

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

    &--visible {
      @extend .with-float-animation;

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

    background-color: black;
    mix-blend-mode: color;
  }
}
</style>
