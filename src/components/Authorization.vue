<template>
  <button @click="send">Enter</button>
  <a href="/registration">Go to registration</a>
</template>

<script lang="ts">
import { defineComponent } from "vue"

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
  methods: {
    send() {
      if (this.login?.length && this.password?.length) {
        const body = JSON.stringify({login: this.login, password: this.password});

        fetch(this.$store.state.url + '/auth', {
          ...this.$store.state.request,
          body
        })
        .catch((err:Error) => { throw err; })
        .then((data: Response) => {
          if (data.status === 200) return data.text();

          this.emitter.emit('showError', [this.$store.state.errors[data.status].text, data.status]);
        })  
        .then((data: string | undefined) => {
          if (!data) return;

          localStorage.setItem('jwt', data);
          this.$router.push('/home');
        })
        return;
      }
      this.$emit('displayErrors', [this.login?.length, this.password?.length]);
    }
  },
})
</script>