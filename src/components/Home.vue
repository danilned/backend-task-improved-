<template>
  <Posts />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Posts from "./Posts.vue";

export default defineComponent({
  components: { Posts, }
})
</script>