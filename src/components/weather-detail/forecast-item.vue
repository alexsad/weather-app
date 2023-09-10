<style lang="scss">
.forecast-item {
  order: 0;
  flex: 0 1 auto;
  align-self: auto;

  > * {
    display: block;
    width: 100%;
    text-align: center;
    font-weight: normal;
  }

  > i {
    font-size: 34px;
  }

  > span:first-child {
    font-size: 15px;
  }

  > span:last-child {
    font-size: 19px;
  }
}
</style>

<template lang="pug">
.forecast-item
    span {{description}}
    i(:class="'icon-' + icon")
    span {{temp}}°C
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    description: String,
    icon: String,
    temp: Number
  }
})
</script>
