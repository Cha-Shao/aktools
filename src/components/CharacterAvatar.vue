<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  member: {
    type: Object,
    default: []
  }
})

const borderColor = ref("white")

const updateAvatarColor = () => {
  switch (props.member?.rarity) {
    case 1:
      borderColor.value = '#808080'
      break
    case 2:
      borderColor.value = '#d3db2e'
      break
    case 3:
      borderColor.value = '#09b3f7'
      break
    case 4:
      borderColor.value = '#d8b3d8'
      break
    case 5:
      borderColor.value = '#ffc90e'
      break
    case 6:
      borderColor.value = '#ff7f27'
      break
  }
}
updateAvatarColor()

watch(() => props.member, (newVal, oldVal) => {
  updateAvatarColor()
})
</script>

<template>
  <div class="avatar">
    <img :src="`/character/头像_${props.member?.name}.png`" alt="avatar" :style="{ border: `7px solid ${borderColor}` }" class="avatar">
    <p class="name">{{ props.member?.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  .avatar {
    width: 5rem;
    height: 5rem;
  }

  .name {
    margin-top: 0.5rem;
    text-align: center;
  }
}
</style>