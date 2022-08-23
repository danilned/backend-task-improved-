<template>
  <div class="post-created" v-if="post.status">
    <p>{{ post.data }}</p>
  </div>
  <div class="add-post-container">
    <textarea placeholder="Add text to your post!" type="text" v-model="input"></textarea>
    <div class="input-error" ref="input-error">Fill the area with text!</div>
    <button class="add-post" @click="create">
      Add Post
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { postsAttributes } from '../../server/src/models/init-models';

export default defineComponent({
  data() {
    return {
      input: '',
      post: {
        status: false,
        data: '',
      },
    }
  },
  methods: {
    async create() {
      const el = this.$refs['input-error'] as HTMLDivElement;

      if (!this.input.length) {
        el.classList.add('input-show');
        return;
      }
      el.classList.remove('input-show')

      const body = JSON.stringify({jwt: localStorage.getItem('jwt'), data: this.input, status: true as const});

      await fetch(this.$store.state.url + '/create_post', {
        ...this.$store.state.request,
        body
      })
      .catch((err: Error) => { throw err; })
      .then(data => data.json())
      .then((data: postsAttributes & Partial<{status: boolean}>) => {
        if (typeof data.status === 'number') {
          this.emitter.emit('showError', [this.$store.state.errors[data.status].text, data.status]);
          return;
        }
        this.post.status = true;
        this.post.data = 'Data inserted!';
        setTimeout(() => {this.post.status = false}, 2500);
        this.$store.state.posts.push({status: true, post_data: data.post_data, post_id: data.post_id, id: data.id});
      })
    }
  },
})
</script>

<style lang="scss" scoped>
  .add-post-container {
    padding: 15px;
    margin: 0 auto;
    width: fit-content;
    position: relative;
    > * {
      display: block;
    }
    > button {
      margin: 25px auto 0px auto;
    }
    > textarea {
      font-family: "Roboto-Thin";
      min-height: 100px;
      min-width: 250px;
      max-height: 500px;
      max-width: calc(100vw - 200px);
      outline: none;
      border: 1px solid #000;
      &::placeholder {
        text-align: center;
        font-size: 13px;
      }
    }
  }
  .post-created {
    position: absolute;
    padding: 8px;
    margin: 8px;
    border: 1px solid #dbdbdb;
    border-radius: 2px;
  }
</style>