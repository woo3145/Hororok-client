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
import { onMounted, ref } from 'vue';
import FeedItem from '@/components/FeedItem.vue';
import { Feed } from '../types';
import UserProfileCard from '@/components/UserProfileCard.vue';
import { useRoute } from 'vue-router';
import { useFeedStore } from '@/stores/feedStore';

const route = useRoute();
const userId = Number(route.params.userId);

const filteredFeeds = ref<Feed[]>([]);
const feedStore = useFeedStore();

onMounted(async () => {
  await feedStore.fetchFeeds();
  feedStore.feeds.filter((f) => f.user?.user_id === userId);
});
</script>

this.user =
