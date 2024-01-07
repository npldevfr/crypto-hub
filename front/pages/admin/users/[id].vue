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
const { post: toggleBlockedUser } = toggleBlock(user_id)
const { post: loginAsUser } = loginAs(user_id)
</script>

<template>
  <div class="user-details-container">
    <Head>
      <Title>CryptoHUB &mdash; Utilisateurs</Title>
    </Head>

    <div class="action-button">
      <Button
        danger
        size="lg"
        @click="deleteUser().execute().then(() => push({ name: 'admin-users' }))"
      >
        Supprimer
      </Button>
    </div>

    <div class="action-button">
      <Button
        size="lg"
        @click="loginAsUser().execute().then(() => push({ name: 'index' }))"
      >
        Login as {{ user?.username }}
      </Button>
    </div>

    <div class="action-button">
      <Button
        size="lg"
        :danger="user?.is_blocked"
        @click="toggleBlockedUser().execute().then(() => refreshUser().execute())"
      >
        {{ user?.is_blocked ? 'Débloquer' : 'Bloquer' }}
      </Button>
    </div>

    <div class="avatar-container">
      <Avatar :src="user?.avatar" :alt="user?.username" size="profile" />
    </div>

    <div class="account-info">
      Connecté avec {{ user?.providers.map((provider) => provider.provider).join(',') }}
    </div>

    <div class="user-form">
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
    </div>
  </div>
</template>

<style scoped>
/* Style pour le conteneur principal */
.user-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Style pour les boutons */
.action-button {
  margin-top: 10px;
  margin-bottom: 10px;
}

/* Style pour l'avatar */
.avatar-container {
  margin-top: 20px;
}

/* Style pour les informations du compte */
.account-info {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

/* Style pour le formulaire */
.user-form {
  width: 300px;
  margin-top: 20px;
}
</style>
