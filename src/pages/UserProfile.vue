<template>
  <div class="w-full max-w-screen-md mx-auto py-12">
    <UserProfileCard />
    <div class="py-12 space-y-4">
      <div v-for="feed in filteredFeeds" :key="feed.feed_id">
        <FeedItem :feed="feed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import FeedItem from '@/components/FeedItem.vue';
import { Feed } from '../types';
import UserProfileCard from '@/components/UserProfileCard.vue';
import { useRoute } from 'vue-router';
import { useFeedStore } from '@/stores/feedStore';

const route = useRoute();

const filteredFeeds = ref<Feed[]>([]);
const feedStore = useFeedStore();

// 사용자 ID를 ref로 래핑하고 watch로 감시
const userId = ref(Number(route.params.userId));

// 라우트의 userId가 변경될 때 실행할 함수
const updateFeeds = async () => {
  await feedStore.fetchFeeds();
  filteredFeeds.value = feedStore.feeds.filter(
    (f) => f.user?.user_id === userId.value
  );
};

// 라우트 변경 감시
watch(
  () => route.params.userId,
  (newUserId) => {
    userId.value = Number(newUserId);
    updateFeeds();
  }
);

// 컴포넌트가 마운트될 때 초기 데이터 로드
onMounted(updateFeeds);
</script>
