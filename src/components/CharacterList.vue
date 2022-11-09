<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  member: {
    type: Object,
    default: []
  }
})

const backgroundColor = ref('white')

const updateListColor = () => {
  switch (props.member?.rarity) {
    case 1:
      backgroundColor.value = '#808080'
      break
    case 2:
      backgroundColor.value = '#d3db2e'
      break
    case 3:
      backgroundColor.value = '#09b3f7'
      break
    case 4:
      backgroundColor.value = '#d8b3d8'
      break
    case 5:
      backgroundColor.value = '#ffc90e'
      break
    case 6:
      backgroundColor.value = '#ff7f27'
      break
  }
}
updateListColor()

watch(() => props.member, (newVal, oldVal) => {
  updateListColor()
})
</script>

<template>
  <span class="list" :style="{
    background: backgroundColor
  }">
    <img :src="`/character/头像_${props.member?.name}.png`" alt="list" class="avatar">
    <p class="name">{{ props.member?.name }}</p>
  </span>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  align-items: center;
  margin: 0.15rem 0.15rem;
  width: fit-content;
  padding-right: 0.5rem;
  font-size: 1.17rem;

  .avatar {
    width: 2rem;
    height: 2rem;
  }

  .name {
    color: white;
    margin-left: 0.3rem;
    text-align: center;
    flex-shrink: 0;
  }
}
</style>