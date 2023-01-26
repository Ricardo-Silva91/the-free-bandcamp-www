<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("getLatestVinylAlbumsFromRemote");
    // this.$store.dispatch("getLatestAlbumsFromRemote");
  },
};
</script>

<style lang="scss">
body {
  background-color: rgba($color-gainsboro, 0.2);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}
</style>
