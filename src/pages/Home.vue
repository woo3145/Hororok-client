<template>
  <div class="w-full max-w-screen-md mx-auto py-12">
    <FeedCreator />
    <div class="py-12 space-y-4">
      <div v-for="feed in feedStore.feeds" :key="feed.feed_id">
        <FeedItem :feed="feed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FeedCreator from '@/components/FeedCreator.vue';
import { onMounted } from 'vue';
import FeedItem from '@/components/FeedItem.vue';
import { useFeedStore } from '@/stores/feedStore';

const feedStore = useFeedStore();

onMounted(() => {
  feedStore.fetchFeeds();
});
</script>
