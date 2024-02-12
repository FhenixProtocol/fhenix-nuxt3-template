<template>
  <div class="main">
    <div>
      <img class="logo" :class="!dark ? 'light' : ''" src="~/assets/images/logo.png" />
    </div>
    <button class="btn btn-success" @click="connect" :disabled="isItFhenixNetwork">{{ (isItFhenixNetwork) ? 'Connected to Fhenix' : 'Connect to Fhenix Network' }}</button>
    <div>Balance: {{ isItFhenixNetwork ? balance : '---' }}</div>
    <div v-if="isItFhenixNetwork">
      <NuxtLink to="/extra-page">Continue to page 2</NuxtLink>
    </div>
    <button class="btn btn-primary btn-sm" @click="toggleTheme()">Switch to {{  dark ? "light" : "dark" }} mode</button>
  </div>
</template>

<script lang="ts">

import ChainMixin, { provider } from '../mixins/ChainMixin';
import CommonProps from '../mixins/CommonProps';


import EventBus from "../event-bus";

import { defineComponent } from 'vue';
import { FhenixClient } from "fhenixjs";
import type { SupportedProvider } from "fhenixjs";

import { useThemeToggle } from '../composables/useThemeToggle';

export default defineComponent({
  mixins: [ CommonProps, ChainMixin ],
  setup() {
    const { dark, toggleTheme } = useThemeToggle();
    
    return {
      dark,
      toggleTheme,
    };
  },
  data() {
    return { 
      balance: "",
    }
  },
  mounted() {
    var self = this;

    EventBus.listenToEvent('network:connected', async (connected :boolean) => { 
      console.log("network:connected", connected);
      self.updateFHEClient(new FhenixClient({ provider: provider as SupportedProvider }));
      self.balance = await self.getBalance(provider)
    });
  },
  methods: {
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