<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Button>button</Button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Button from '../submodules/crispy-ui/src/components'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Button
}
}
</script>
