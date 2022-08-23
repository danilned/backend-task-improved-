<template>
  <div :class="{'active': activeClass, 'error-container': true}">
    <p>Some error occured !</p>
    <p class="error-text" ref="error"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      activeClass: false,
    }
  },
  created() {
    this.emitter.on('showError', (arr: [string, number]) => {
      const errorContainer = this.$refs.error as HTMLParagraphElement;
      errorContainer.innerHTML = arr[0] + '. Error code: ' + arr[1];

      this.activeClass = true;
      setTimeout(() => this.activeClass = false, 3500);
    })
  }
})
</script>

<style lang="scss">
  .error-container {
    width: 250px;
    height: 125px;
    position: absolute;
    top: 0;
    right: -300px;
    margin: 12px;
    background: #fff;
    border-radius: 3px;
    border: 2px solid #000;
    padding: 5px;
    transition: 0.4s;
    > p {
      width: 100%;
      font-size: 14px;
      text-align: center;
      background: #cd5c5c;
      color: #fff;
      border-radius: 2px;
      padding: 4px 0px;
    }
    > .error-text {
      margin-top: calc(25% - 25px);
    }
    &.active {
      right: 0px;
    }
  }
</style>