<script setup lang="ts">
const { login, user, isUnauthenticated, logout } = useAuth()

const { post } = login()

const loginForm = ref({
  email: 'admin@gmail.com',
  password: 'admin',
})

const attemptLogin = async () => {
  await post({
    email: loginForm.value.email,
    password: loginForm.value.password,
  }).execute()
}

</script>

<template>
  <div v-if="isUnauthenticated">
    <div class="bg-red-200" @click="attemptLogin">Login</div>
    <input v-model="loginForm.email" placeholder="email" />
    <input v-model="loginForm.password" type="password" placeholder="password" />
  </div>
  <div v-else>
    <div class="bg-green-200" @click="logout">Logout</div>
    <pre>{{ user }}</pre>
  </div>
</template>

<style scoped>

</style>
