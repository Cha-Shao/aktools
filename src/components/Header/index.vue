<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackButton from './Back.vue';
import HomeButton from './Home.vue'

const router = useRouter()

const showHome = ref(false)
</script>

<template>
  <div class="header">
    <div class="buttons">
      <BackButton class="button" @click="router.go(-1)" />
      <HomeButton class="button" style="margin-left: 5px;" @click="showHome = !showHome" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;

  .buttons {
    background: #070707;
    box-shadow: 0 12px 12px #0000004d;
    display: flex;
    align-items: center;
    height: 3rem;
  }

  .setting {
    z-index: 2;
    cursor: pointer;

    .gear {
      width: 3rem;
      height: 3rem;
      filter: drop-shadow(0 12px 7px #ffffff88);
    }
  }
}
</style>