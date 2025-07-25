<template>
  <form @submit.prevent="submit" aria-label="Sign Up">
    <h2>Sign Up</h2>
    <label>Email:</label>
    <input aria-label="Email" type="email" v-model="email" required />

    <label>Password:</label>
    <input aria-label="Password" type="password" v-model="password" required />

    <button type="submit">Sign Up</button>
    <p v-if="success">{{ success }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const success = ref('')
const error = ref('')

const submit = async () => {
  success.value = ''
  error.value = ''
  try {
    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    if (!res.ok) throw new Error('Signup failed')

    success.value = 'Check your inbox to verify your email'
  } catch (err) {
    error.value = 'Signup failed'
  }
}
</script>