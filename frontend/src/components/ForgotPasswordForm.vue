<template>
  <form @submit.prevent="submit" aria-label="Forgot Password">
    <h2>Forgot Password</h2>
    <label>Email:</label>
    <input aria-label="Email" type="email" v-model="email" required />

    <button type="submit">Reset Password</button>
    <p v-if="success">{{ success }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const success = ref('')
const error = ref('')

const submit = async () => {
  success.value = ''
  error.value = ''
  try {
    const res = await fetch('http://localhost:3000/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })

    if (!res.ok) throw new Error('Failed to send reset email')

    success.value = 'Check your email for the reset link'
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
