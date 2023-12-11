<script setup lang="ts">
const { login, user } = useAuth()

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
  <div>
    <div class="bg-red-200" @click="attemptLogin">Login</div>
    <input v-model="loginForm.email" placeholder="email" />
    <input v-model="loginForm.password" type="password" placeholder="password" />
    <pre>
      {{ user }}
    </pre>
  </div>
</template>

<style scoped>

</style>
