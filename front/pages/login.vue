<script setup lang="ts">
const { login } = useAuth();
definePageMeta({
  middleware: "not-autenticathed",
});

const route = useRoute();
const { setUser } = useAuth();

onMounted(async () => {
  if (route.query.token) {
    await setUser(route.query.token as string);
  }
});
const { post, errorMessage, isFetching } = login();

const loginForm = ref({
  email: "admin@gmail.com",
  password: "admin",
});

const attemptLogin = async () => {
  await post({
    email: loginForm.value.email,
    password: loginForm.value.password,
  }).execute();
};
</script>

<template>
  <Head>
    <Title> CryptoHUB &mdash; Connexion </Title>
  </Head>
  <div class="flex flex-col items-center pt-10 justify-center">
    <div class="w-1/2">
      <Section
        title="Connexion"
        subtitle="Connectez-vous à votre compte CryptoHUB"
      >
        <br />

        <SocialList>
          <SocialProvider provider-name="google" icon="i-logos-google-icon" />
          <SocialProvider provider-name="twitter" icon="i-logos-twitter" />
        </SocialList>
        <Separator> Ou </Separator>
        <FormKit
          type="form"
          :actions="false"
          submit-label="Se connecter"
          :errors="[errorMessage]"
          @submit="attemptLogin"
        >
          <div class="flex flex-col gap-2">
            <FormKit
              v-model="loginForm.email"
              label="Email"
              validation="email|required"
              placeholder="Email"
              type="text"
            />

            <FormKit
              v-model="loginForm.password"
              :classes="{ outer: 'mb-4' }"
              label="Mot de passe"
              validation="required|password"
              placeholder="Mot de passe"
              type="password"
            />
          </div>

          <NuxtLink
            to="/register"
            class="text-xs text-gray-500 hover:text-gray-700"
          >
            Pas encore de compte ? <span class="underline">S'inscrire</span>
          </NuxtLink>

          <div class="flex justify-end">
            <Button
              :loading="isFetching"
              type="submit"
              hierarchy="primary"
              size="sm"
            >
              Se connecter
            </Button>
          </div>
        </FormKit>
      </Section>
    </div>
  </div>
</template>
