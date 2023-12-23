<template>
  <Header />
  <div class="pt-16">
    <router-view />
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { useUserStore } from '@/stores/userStore';
import { onMounted, watch } from 'vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useFeedStore } from './stores/feedStore';

const feedStore = useFeedStore();
const userStore = useUserStore();

watch(
  () => userStore.currentUser?.user_id,
  () => {
    userStore.fetchFollowing();
  },
  { immediate: true } // 컴포넌트가 마운트되자마자 즉시 실행되도록 설정
);

// 컴포넌트가 마운트될 때 피드를 가져옵니다.

onMounted(async () => {
  await userStore.fetchCurrentUser();
  await userStore.fetchFollowing();
  await feedStore.fetchFeeds();
});
</script>
