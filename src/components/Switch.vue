<script lang="ts" setup>
const props = defineProps({
  value: Boolean
})
</script>

<template>
  <div class="switch" :style="{
    background: props.value == true ? '#0075a8' : '#5c5c5c'
  }">
    <div class="dot" :style="{
      transform: `translateX(${props.value == true ? 'calc(100% - 0.3rem * 2)' : 0})`
    }">

    </div>
    <p style="margin-right: 2rem;">开启</p>
    <p>关闭</p>
  </div>
</template>

<style lang="scss" scoped>
.switch {
  width: fit-content;
  padding: 0.3rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 1.17rem;
  box-shadow: inset 0 5px 11px black;
  color: white;

  .dot {
    content: '';
    width: 50%;
    height: calc(100% - 0.3rem * 2);
    position: absolute;
    transition: 0.2s linear;
    background-color: white;
    background-image: url('../assets/button/switch.png');
    background-size: contain;
  }

  p {
    padding: 0.3rem 0.5rem;
  }
}
</style>