<script setup lang="ts">
import { userServiceController } from '~/services/userServiceController'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const { params } = useRoute()
const { push } = useRouter()
const user_id = params.id.toString()
const { show, updateOrDelete, toggleBlock, loginAs } = userServiceController()

const { data: user, get: refreshUser } = show(user_id)
const { put: updateUser, delete: deleteUser, isFetching: isProcessing } = updateOrDelete(user_id)
const { post: toggleBlockedUser, isFetching: isBlocking } = toggleBlock(user_id)
const { post: loginAsUser } = loginAs(user_id)
</script>

<template>
  <Head>
    <Title>CryptoHUB &mdash; Utilisateurs</Title>
  </Head>

  <Button
    danger
    size="lg"
    @click="deleteUser().execute().then(() => push({ name: 'admin-users' }))"
  >
    Supprimer
  </Button>

  <Button
    size="lg"
    @click="loginAsUser().execute().then(() => push({ name: 'index' }))"
  >
    Login as {{ user?.username }}
  </Button>

  <Button
    size="lg"
    :danger="user?.is_blocked"
    @click="toggleBlockedUser().execute().then(() => refreshUser().execute())"
  >
    {{ user?.is_blocked ? 'Débloquer' : 'Bloquer' }}
  </Button>

  <Avatar
    :src="user?.avatar" :alt="user?.username" size="profile"
  />

  Connecté avec {{ user?.providers.map((provider) => {
    return provider.provider
  }).join(',') }}

  <FormKit
    v-if="user"
    type="form"
    :disabled="isProcessing"
    :actions="false"
    @submit="updateUser({
      email: user.email,
      username: user.username,
    }).execute()"
  >
    <FormKit
      v-model="user.email"
      label="Email"
      validation="email|required"
      placeholder="Email"
      type="text"
    />

    <FormKit
      v-model="user.username"
      label="Nom d'utilisateur"
      validation="required"
      placeholder="Nom d'utilisateur"
      type="text"
    />

    <Button :loading="isProcessing" type="submit" hierarchy="primary" size="sm">
      Enregistrer
    </Button>
  </FormKit>
</template>
