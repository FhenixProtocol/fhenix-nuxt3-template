<template>
  <div class="main">
    <div>
      <img class="logo" :class="!dark ? 'light' : ''" src="~/assets/images/logo.png" />
    </div>
    <button class="btn btn-success" @click="fnxConnect" :disabled="isItFhenixNetwork">{{ (isItFhenixNetwork) ? 'Connected to Fhenix' : 'Connect to Fhenix Network' }}</button>
    <div class="address"><b>Address:</b> {{ isItFhenixNetwork ? address : '---' }}</div>
    <div><b>Balance:</b> {{ isItFhenixNetwork ? balance : '---' }}</div>
    <div v-if="isItFhenixNetwork">
      <NuxtLink to="/extra-page">Continue to page 2</NuxtLink>
    </div>
    <button class="btn btn-primary btn-sm" @click="toggleTheme()">Switch to {{  dark ? "light" : "dark" }} mode</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const { dark, toggleTheme } = useThemeToggle();
const { fnxConnect, isItFhenixNetwork, balance, address } = useChain();

onMounted(async () => {
  if (localStorage.getItem("isConnected")) {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await fnxConnect();
      } catch (err) {
        console.error(err);
      }
    }
  }
});
</script>

<style scoped>
  .logo {
    height: 40px;
  }

  .logo.light {
    filter: invert(100%);
  }
</style>