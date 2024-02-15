<template>
  <div class="main">
    <h1>Page 2 - Encrypt</h1>
    <div class="address"><b>Address:</b> {{ address }}</div>
    <div class="encrypt-line">
      <input ref="txtNumberToEncrypt" class="form-control" type="number" placeholder="Type a number to encrypt" />
      <button class="btn btn-success" @click="encrypt(txtNumberToEncrypt)">Encrypt</button>
    </div>
    <div class="result" v-if="encryptedText != ''">
      Result: {{ encryptedText }}

    </div>
    <button class="btn btn-success" @click="navigateToPage('/')">Go to home</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { navigateToPage } = useCommon();

const txtNumberToEncrypt = ref(null);
const { address } = useChain();
const { encrypt, encryptedText } = useFHE();


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