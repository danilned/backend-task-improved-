<template>
  <component :is="navbar"></component>
  <router-view />
  <Error />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Error from './components/Error.vue';
import NavBar from './components/NavBar.vue';

export default defineComponent({
  components: {
    Error,
    NavBar,
  },
  computed: {
    navbar() {
      if (this.$route.meta.layout === 'NavBar') return 'NavBar';
    }
  },
  watch: {
    '$route': () => {
      if (localStorage.getItem('jwt') === null && ['/', '/registration'].indexOf(`${location.pathname}`) === -1) {
        location.href = '/';
      }
    }
  }
})
</script>
