<script setup lang="ts">
import { useRouter } from "vue-router";

import Header from './components/Header/index.vue';

const router = useRouter()
// 分开电脑手机页面
// onMounted(() => {
//   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
//     // 移动端
//     router.push("/m")
//   }
//   else {
//     // PC
//     router.push("/")
//   }
// });
</script>

<template>
  <div class="root">
    <Header class="header" />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.root {
  backdrop-filter: blur(12px);
  min-height: 100vh;

  .header {
    position: absolute;
    left: 1.5rem;
    top: 1.5rem;
    width: calc(100% - 3rem);
  }
}
</style>
