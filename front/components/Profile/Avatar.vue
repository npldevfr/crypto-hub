<script lang="ts" setup>
const hasAvatar = ref(true)
</script>

<template>
  <div class="w-10 h-10 rounded-full cursor-pointer">
    <template v-if="hasAvatar">
      <img
        id="avatarButton"
        type="button"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/655.jpg"
        alt="User dropdown"
        class="rounded-full"
      >
    </template>
    <template v-else>
      <div>Par défaut</div>
    </template>
  </div>
  <div
    id="userDropdown"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
  >
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>Bonnie Green</div>
      <div class="font-medium truncate">
        name@flowbite.com
      </div>
    </div>
    <ProfileNavigation>
      <ProfileItem to="/" label="Home" />
      <ProfileItem to="/dashboard" label="Dashboard" />
    </ProfileNavigation>
  </div>
</template>
