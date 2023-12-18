<script setup lang="ts">
import {userServiceController} from "~/services/userServiceController";

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { params } = useRoute()
const { show, destroy, update } = userServiceController()
const user_id = params.id.toString()

const { data: user } = show(user_id)
const { put: updateUser, isFetching: isUpdating } = update(user_id)

</script>

<template>
  <Head>
    <Title>CryptoHUB &mdash; Utilisateurs</Title>
  </Head>


  <FormKit v-if="user"
      type="form"
           :disabled="isUpdating"
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

    <Button :loading="isUpdating" type="submit" hierarchy="primary" size="sm">
      Enregistrer
    </Button>

  </FormKit>
</template>
