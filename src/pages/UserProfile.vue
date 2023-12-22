<template>
  <div class="w-full max-w-screen-md mx-auto py-12">
    <UserProfileCard />
    <div class="py-12 space-y-4">
      <div v-for="feed in feeds" :key="feed.feed_id">
        <FeedItem :feed="feed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FeedItem from '@/components/FeedItem.vue';
import { Feed } from '../types';
import { getFeeds } from '@/api/feeds';
import UserProfileCard from '@/components/UserProfileCard.vue';

const feeds = ref<Feed[]>([
  {
    feed_id: 1,
    contents: 'hihi',
    createdAt: new Date(),
    user: {
      user_id: 1,
      id: '3145',
      name: 'woo3145',
      nickname: 'hhh',
      birth: new Date(),
      gender: 'M',
      followers_cnt: 100000,
      following_cnt: 100000,
    },

    likes_cnt: 4,
    comments_cnt: 2,
  },
  {
    feed_id: 2,
    contents: '졸립다',
    createdAt: new Date(),
    user: {
      user_id: 1,
      id: '3145',
      name: 'woo3145',
      nickname: 'hhh',
      birth: new Date(),
      gender: 'M',
      followers_cnt: 100000,
      following_cnt: 100000,
    },

    likes_cnt: 2,
    comments_cnt: 4,
  },
]);

const fetchFeeds = async () => {
  try {
    const response = await getFeeds(); // ?user_id=userId
    throw new Error('임시 에러');
    feeds.value = response.data.feeds;
  } catch (error) {
    console.error('Error fetching feeds:', error);
  }
};

onMounted(fetchFeeds);
</script>
