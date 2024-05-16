<template>
  <v-app id="app">
    <Login />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

</script>

<style>
#app {
  background-color: rgba(235, 235, 235, 0.461);
}
</style>
