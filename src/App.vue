<script setup lang="ts">
import { RouterView } from 'vue-router'
import './assets/fontello-afd02c25/css/fontello.css'
</script>
<template>
  <header>
    <RouterView />
  </header>
</template>

<style scoped>
header,
html,
body {
  padding: 0;
  margin: 0;
}

header {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
