<script setup lang="ts">
const { register } = useAuth();
definePageMeta({
  middleware: "not-autenticathed",
});

const { post, errorMessage, isFetching } = register();

const registerForm = ref({
  username: "test",
  email: "test@gmail.com",
  password: "test",
  password_confirmation: "test",
});

const attemptRegister = async () => {
  await post({
    username: registerForm.value.username,
    email: registerForm.value.email,
    password: registerForm.value.password,
    password_confirmation: registerForm.value.password_confirmation,
  }).execute();
};
</script>

<template>
  <Head>
    <Title> CryptoHUB &mdash; Inscription </Title>
  </Head>
  <div class="flex flex-col items-center pt-10 justify-center">
    <div class="w-1/2">
      <Section title="Inscription" subtitle="Créez votre compte CryptoHUB">
        <br />

        <SocialList>
          <SocialProvider provider-name="google" icon="i-logos-google-icon" />
          <SocialProvider provider-name="twitter" icon="i-logos-twitter" />
        </SocialList>
        <Separator> Ou </Separator>
        <FormKit
          type="form"
          :actions="false"
          :errors="[errorMessage]"
          @submit="attemptRegister"
        >
          <div class="flex flex-col gap-2 w-full">
            <FormKit
              v-model="registerForm.username"
              label="Nom d'utilisateur"
              validation="required"
              placeholder="Nom d'utilisateur"
              type="text"
            />

            <FormKit
              v-model="registerForm.email"
              label="Email"
              validation="email|required"
              placeholder="Email"
              type="text"
            />

            <div class="flex flex-row gap-2 w-full">
              <FormKit
                v-model="registerForm.password"
                label="Mot de passe"
                validation="required|password"
                placeholder="Mot de passe"
                type="password"
              />

              <FormKit
                v-model="registerForm.password_confirmation"
                label="Confirmation du mot de passe"
                validation="required|password"
                placeholder="Confirmation du mot de passe"
                type="password"
              />
            </div>
          </div>

          <NuxtLink
            to="/login"
            class="text-xs text-gray-500 hover:text-gray-700"
          >
            Déjà un compte ? <span class="underline">Se connecter</span>
          </NuxtLink>

          <div class="flex justify-end">
            <Button
              :loading="isFetching"
              type="submit"
              hierarchy="primary"
              size="sm"
            >
              S'inscrire
            </Button>
          </div>
        </FormKit>
      </Section>
    </div>
  </div>
</template>
