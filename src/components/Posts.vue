<template>
  <div class="posts-content" v-if="posts.length">
    <div 
      class="post-loop content"
      v-for="(post, key) in posts"
      :key="post.post_id"
    > 
      <div class="posts">
        <div class="inner-post">
          <div class="post-text">
            <p class="post-number">Post id: {{ post.post_id }}</p>
            <p class="post-header" @click="checkRoute(key)">
              <span class="bold">Post header:</span>
              <br />
              <div v-if="edit !== key">
                {{ post.post_data }}
              </div>
              <input 
                v-else
                type="text"
                v-model="editedText"
                @focusout="focusedout($event, post.post_id, key)"
                v-on:keyup.enter="focusedout($event, post.post_id, key)"
              />
            </p>
          </div>
        </div>
      </div>
      <div
        class="side-btns"
        v-if="sorted"
      >
        <div class="remove"><button class="cancel" @click="remove(post.post_id, key)"><img src="../assets/imgs/trash.svg" alt="trash"></button></div>
        <button class="remove cancel" @click="postStatus(post.post_id, key)">
          <img v-if="post.status" src="../assets/imgs/hide.png" alt="hide">
          <img v-else src="../assets/imgs/show.png" alt="hide">
        </button>
      </div>
    </div>
  </div>
  <div v-else class="no-posts">
    <div class="add-post-link" v-if="$route.fullPath === '/edit'">
      <router-link to="/add">You don't have any posts, click to add</router-link>
    </div>
    <h1 v-else>No Posts Yet!</h1>
  </div>
</template>

<script lang="ts">
//helpers
import jwtParser from '../helpers/jwtParser';

import { postsAttributes } from '../../server/src/models/posts';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    sorted: Boolean
  },
  data() {
    return {
      edit: null as null | number,
      editedText: '',
      posts: [] as postsAttributes[],
    }
  },
  methods: {
    sort() {
      const jwt = localStorage.getItem('jwt');
      if (typeof jwt === 'string') {
        const parsed = jwtParser(jwt);

        if (parsed.rights === 1) {
          this.posts = this.$store.state.posts;
          return;
        }

        this.posts = this.$store.state.posts.filter((cur: postsAttributes) => cur.id === parsed.id);
      }
    },
    remove(postId: number, key: number) {
      const body = JSON.stringify({postId, jwt: localStorage.getItem('jwt')});

      fetch(this.$store.state.url + '/delete_posts', {
        ...this.$store.state.request,
        body,
      })
      .catch(err => { throw err })
      .then(data => {
        if (data.status === 200) return data.text();

        this.emitter.emit('showError', [this.$store.state.errors[data.status].text, data.status]);
      })
      .then(() => {
        const index = this.$store.state.posts.findIndex((cur: postsAttributes) => cur.post_id === postId);
        this.posts.splice(key, 1);
        this.$store.state.posts.splice(index, 1);
      });
    },
    async postStatus(postId: number, key: number) {
      const body = JSON.stringify({postId, status: !this.$store.state.posts[key].status, jwt: localStorage.getItem('jwt')});

      if (await this.editFetch(body, key)) {
        this.posts[key].status = !this.posts[key].status;
      }
    },
    async focusedout(event: Event & {key?: string}, postId: number, key: number) {
      if (event.key === 'Enter') {
        const el = event.srcElement as HTMLInputElement;
        return el.blur();
      }

      if (!this.editedText.length) return;

      const body = JSON.stringify({postId, data: this.editedText, jwt: localStorage.getItem('jwt')});

      if (await this.editFetch(body, key)) {
        this.posts[key].post_data = this.editedText;
      }

      this.edit = null;
      this.editedText = '';
    },
    checkRoute(key: number) {
      if (this.sorted) {
        this.edit = key;
      }
    },
    async editFetch(body: string, key: number): Promise<boolean> {
      return fetch(this.$store.state.url + '/edit_posts', {
        ...this.$store.state.request,
        body
      })
      .catch((err: Error) => { throw err; })
      .then((data: Response) => {
        if (data.status === 200) {
          return true;
        }

        this.emitter.emit('showError', [this.$store.state.errors[data.status].text, data.status]);
        return false;
      });
    },
  },
  async mounted() {
    if (this.$store.state.posts?.length) {
      if (this.sorted) {
        this.sort();
        return;
      }
      this.posts = this.$store.state.posts.filter((cur: postsAttributes) => cur.status);
      return;
    }

    const body = JSON.stringify({ jwt: localStorage.getItem("jwt") });

    const posts = JSON.parse(await fetch(this.$store.state.url + "/show_posts", {
      ...this.$store.state.request,
      body
    })
    .catch((err: Error) => { throw err; })
    .then(data => data.text())
    .then(data => data)) as postsAttributes[] | {status: number};

    if ('status' in posts) {
      this.emitter.emit('showError', [this.$store.state.errors[posts.status].text, posts.status]);
      return;
    }

    if (posts.length > 0) {
      this.$store.state.posts = posts;
      if (this.sorted) {
        this.sort();
        return;
      }
      this.posts = posts.filter((cur: postsAttributes) => cur.status === true);
      return;
    }
  },
})
</script>

<style lang="scss" scoped>
.posts-content {
  margin: 30px 30px 0px 30px;
  > .post-loop.content {
    display: flex;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 10px;
    > .posts {
      flex-grow: 1;
      > .inner-post {
        > .post-text {
          .post {
            &-number {
              font-size: 13px;
            }
            &-header {
              font-family: "Roboto-Thin";
            }
          }
          > * {
            margin-bottom: 8px;
            &:last-child {
              margin-bottom: 0px;
            }
          }
        }
      }
    }
    > .side-btns {
      display: flex;
      align-items: center;
      margin-left: auto;
      gap: 6px;
      > div {
        height: fit-content;
      }
      > button {
        border: none;
      }
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
.no-posts {
  .add-post-link {
    margin: 25px auto 0 auto;
    width: fit-content;
    > a {
      font-size: 15px;
    }
  }
}
</style>