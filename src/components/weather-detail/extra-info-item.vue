<style lang="scss">
.extra-weather-info-item {
  order: 0;
  flex: 1 1 auto;
  align-self: auto;
  border-right: 1px solid transparent;

  > * {
    display: block;
    width: 100%;
    text-align: center;
  }

  > span:first-child {
    font-size: 15px;
    font-weight: lighter;
    margin-bottom: 5px;
  }

  > span:last-child {
    font-size: 14px;
    font-weight: normal;
  }
}
</style>

<template lang="pug">
.extra-weather-info-item(:style="{ borderRightColor: borderColor }")
    span {{description}}
    span {{value}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    description: String,
    value: String,
    borderColor: String
  }
})
</script>
