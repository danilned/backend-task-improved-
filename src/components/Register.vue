<template>
  <input type="text" placeholder="Email" v-model="email" autocomplete="off">
  <div class="input-error" ref="input-error">Fill the email area with text!</div>
  <button @click="register">Register</button>
  <a href="/">Back to login</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    register() {
      if (this.login?.length && this.password?.length && this.email.length) {
        const body = JSON.stringify({login: this.login, password: this.password, email: this.email,});
        fetch(this.$store.state.url + '/registration', {
          ...this.$store.state.request,
          body
        })
        .catch((err:Error) => { throw err; })
        .then((data: Response) => { 
          if (data.status === 400) {
            this.emitter.emit('showError', [this.$store.state.errors[data.status].text, data.status]);
            return;
          }
          return data.text();
        })
        .then((data: string | void) => {
          if (data) {
            localStorage.setItem('jwt', data);
            this.$router.push('/home');
          }
        })
        return;
      }
      const el = this.$refs['input-error'] as HTMLDivElement;
      el.classList.add('input-show');
      this.$emit('displayErrors', [this.login?.length, this.password?.length]);
    }
  },
})
</script>