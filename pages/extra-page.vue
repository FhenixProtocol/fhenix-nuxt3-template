<template>
  <div class="main">
    <h1>Page 2 - Encrypt</h1>
    <div class="encrypt-line">
      <input ref="txtNumberToEncrypt" class="form-control" type="number" placeholder="Type a number to encrypt" />
      <button class="btn btn-success" @click="encrypt()">Encrypt</button>
    </div>
    <div class="result" v-if="encryptedText != ''">
      Result: {{ encryptedText }}

    </div>
    <button class="btn btn-success" @click="navigateToPage()">Go to home</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToPage() {
  router.push('/');
}
</script>

<script lang="ts">

import ChainMixin from '../mixins/ChainMixin';
import { fheClient } from '../mixins/CommonProps';
import { defineComponent } from 'vue';

export default defineComponent({
  mixins: [ ChainMixin ],
  data() {
    return { 
      balance: "",
      encryptedText: ""
    }
  },
  mounted() {

  },
  methods: {
    async encrypt() {
      try {
        const element = this.$refs.txtNumberToEncrypt as HTMLInputElement;
        if (element.value !== "") {
          const value = Number(element.value);
          if (fheClient !== null) {
            // We use uint16 for the template, but you can use encrypt_uint8/16/32
            const uint8Array = (await fheClient.encrypt_uint16(value)).data;
            this.encryptedText = `0x${Array.from(uint8Array).map(b => b.toString(16).padStart(2, '0')).join('')}`;
          }
        }
      } catch (err: any) {
        this.encryptedText = `Error: ${err.reason}`;
      }
    }
  }

});
</script>

<style scoped>
.main input {
  width: 300px;
}

.encrypt-line {
  display: flex;
  gap: 10px
}

.result {
  white-space: normal; 
  word-break: break-all;
  
  padding: 10px;
  width: 400px;
  max-height: 200px;
  overflow-y: scroll;

  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  border-radius: 10px;
  background-color: var(--custom-select); 
  color: black;
}
</style>