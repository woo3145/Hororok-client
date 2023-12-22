<template>
  <Header />
  <div class="pt-16">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore();
userStore.fetchCurrentUser();

onMounted(async () => {
  await userStore.fetchCurrentUser();
});
</script>
