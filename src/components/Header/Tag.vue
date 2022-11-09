<script lang="ts" setup>
const props = defineProps({
  active: Boolean,
  important: Boolean
})
</script>

<template>
  <div class="tag" :class="[props.important ? 'important' : 'normal']">
    <div class="tag-background" :class="[props.active ? 'active' : '']">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  background: #313131;
  width: fit-content;
  font-size: 1.25rem;
  box-shadow: 0 12px 12px #0000004d;

  &:active {
    outline: #0098dc solid thick;
  }

  .tag-background {
    width: 9rem;
    text-align: center;
    padding: 0.7rem 0;
    transition: .1s ease;
  }
}

.normal {
  color: white;
  .active {
    background: #0098dc;
  }
}

.important {
  color: #fee211;
  background-image: url(../../assets/tag/background.png);
  background-size: 100%;
  .active {
    background: #fee211;
    color: black;
  }
}
</style>