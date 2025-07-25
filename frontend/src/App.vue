<template>
  <div class="container">
    <SignupForm />
    <hr />
    <ForgotPasswordForm />
  </div>
</template>

<script setup>
import SignupForm from './components/SignupForm.vue'
import ForgotPasswordForm from './components/ForgotPasswordForm.vue'
</script>

<style>
* {
  box-sizing: border-box;
}

body, html, #app {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f9fc;
  color: #333;
}

.container {
  max-width: 400px;
  margin: 2rem auto;
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #0077cc;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.3rem;
  margin-top: 1rem;
  color: #555;
}

input[type="email"],input[type="password"] {
  font-size: 1rem;
  border: 1.8px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type="email"]:focus,input[type="password"]:focus {
  border-color: #0077cc;
  outline: none;
}

button {
  margin-top: 1.8rem;
  background-color: #0077cc;
  border: none;
  color: white;
  font-weight: 600;
  padding: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.05rem;
  transition: background-color 0.25s ease;
}

button:hover {
  background-color: #005fa3;
}

.message {
  margin-top: 1.5rem;
  font-weight: 600;
  color: #2e7d32; /* green for success */
  text-align: center;
}

.error {
  color: #d32f2f; /* red for error */
}

@media (max-width: 480px) {
  .container {
    margin: 1rem;
    padding: 1.5rem 1.8rem;
  }
}
</style>


