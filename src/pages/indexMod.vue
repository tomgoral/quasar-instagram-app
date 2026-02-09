<template>
  <q-page padding>
    <input v-model="msg" />
    <button @click="clearMsg">Clear</button>
    <h5>{{ msg }}</h5>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'IndexPage' })
const msg = ref('Welcome to Your Quasar App')
const clearMsg = () => {
  msg.value = ''
}
</script>

<style></style>
