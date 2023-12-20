<template>
  <div class="w-full max-w-screen-lg mx-auto py-12">
    <FeedCreator />
    <div class="py-12 space-y-4">
      <div v-for="feed in feeds" :key="feed.feed_id">
        <FeedItem :feed="feed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FeedCreator from '@/components/FeedCreator.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import FeedItem from '@/components/FeedItem.vue';
import { Feed } from '../types';

const feeds = ref<Feed[]>([
  {
    feed_id: 1,
    contents: 'hihi',
    createdAt: new Date(),
    user: { user_id: 1, name: 'woo3145' },
  },
  {
    feed_id: 2,
    contents: '졸립다',
    createdAt: new Date(),
    user: { user_id: 1, name: 'woo3145' },
  },
]);

const fetchFeeds = async () => {
  try {
    const response = await axios.get('http://localhost:8000/feeds');
    throw new Error('임시 에러');
    feeds.value = response.data.feeds;
  } catch (error) {
    console.error('Error fetching feeds:', error);
  }
};

onMounted(fetchFeeds);
</script>
