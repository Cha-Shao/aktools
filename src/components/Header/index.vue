<script lang="ts" setup>
import { useRouter } from 'vue-router';
import BackButton from './Back.vue';
import HomeButton from './Home.vue'

const router = useRouter()
</script>

<template>
  <div class="header">
    <BackButton class="button" @click="router.go(-1)"/>
    <HomeButton class="button" style="margin-left: 5px;"/>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 3rem;
  background: #070707;
  box-shadow: 0 12px 12px #0000004d;
  display: flex;
  align-items: center;
}
</style>