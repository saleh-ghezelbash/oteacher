
<template>
  <header>
    <TopBar />
    <div class="container mx-auto">
       <RouterView />
    </div>
  </header>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue';

export default {
  components: {
    TopBar
  }
}
</script>

<style scoped>

</style>
