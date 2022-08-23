<template>
  <div class="nav-bar">
    <div class="container">
      <router-link active-class="active" to="/home">All posts</router-link>
      <router-link active-class="active" to="/add">Add posts</router-link>
      <router-link active-class="active" to="/edit">Edit posts</router-link>
    </div>
    <div class="logout">
      <router-link @click="clear" to="/">Logout</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    clear() {
      localStorage.removeItem('jwt');
      this.$store.state.posts = [];
    }
  }
})
</script>

<style lang="scss">
  .nav-bar {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    width: calc(100% - 2px);
    height: 75px;
    background: #fff;
    border: 1px dashed #000;
    > .container {
      > a {
        margin: 0 12px;
      }
    }
    > .logout {
      position: absolute;
      right: 0;
      top: 0;
      margin: 8px;
    }
  }
</style>