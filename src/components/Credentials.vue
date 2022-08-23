<template>
  <div class="credentials">
    <div class="credentials-container">
      <input type="text" v-model="login" placeholder="Login" autocomplete="off" name="login">
      <div class="input-error" ref="input-error0">Fill the login area with text!</div>
      <input 
        :type="fieldType"
        v-model="password"
        placeholder="Password"
        autocomplete="off"
        @focus="setType($event)"
        @blur="setType($event)"
        name="password"
      />
      <div class="input-error" ref="input-error1">Fill the password area with text!</div>
      <Authorization
        :login="login"
        :password="password"
        v-if="$route.path === '/'"
        @displayErrors="showErrors"
      />
      <Register
        :login="login"
        :password="password"
        @displayErrors="showErrors"
        v-else
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Authorization from "./Authorization.vue";
import Register from "./Register.vue";

export default defineComponent({
  components: { Authorization, Register, },
  data() {
      return {
        login: "",
        password: "",
        fieldType: 'text',
      };
  },
  methods: {
    setType(event: Event): void | string {  
      const target = event?.target as HTMLTextAreaElement;

      if (event.type === 'blur' && !target.value) {
        return this.fieldType = 'text';
      }
      this.fieldType = 'password';
    },
    showErrors(arg: [number, number]) {
      arg.map((cur: number, index: number) => {
        if (!cur) {
          const el = this.$refs['input-error' + index] as HTMLDivElement;

          el.classList.add('input-show');
        }
      }); 
    }
  },
})
</script>

<style lang="scss">
  .credentials {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #dbdbdb;
    > .credentials-container {
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      > input {
        display: block;
        margin-bottom: 16px;
        &::placeholder {
          font-size: 13px;
          padding-left: 2px;
        }
      }
      > button {
        width: 100%;
      }
      a {
        display: block;
        width: fit-content;
        margin: 12px auto 0 auto;
      }
      > .input-error {
        transform: translate(-50%, calc(-100% - 2px));
      }
    }
  }
</style>