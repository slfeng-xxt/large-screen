<script setup>
import { RouterView } from 'vue-router'
import VScaleScreen from 'v-scale-screen'
</script>

<template>
  <v-scale-screen width="1920" height="1080">
    <RouterView />
  </v-scale-screen>
</template>

<style scoped></style>
