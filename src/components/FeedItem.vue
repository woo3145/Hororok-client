<template>
  <div
    class="feed-item space-y-4 rounded-md px-6 py-6 bg-background border cursor-pointer"
  >
    <div class="flex items-center gap-4">
      <router-link :to="`/users/${feed.user?.user_id}`">
        <Avatar class="shrink-0">
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </router-link>

      <div class="w-full flex justify-between">
        <router-link :to="`/users/${feed.user?.user_id}`" class="w-full">
          <p class="font-semibold">{{ feed.user?.name }}</p>
          <p v-if="feed.created_at" class="text-sm text-foreground/60">
            {{ formatDate(new Date(feed.created_at), 'YYYY-MM-DD HH:mm:ss') }}
          </p>
        </router-link>
        <FeedDropdownMenu :feed="feed" v-if="isOwner" />
      </div>
    </div>

    <router-link :to="`/feeds/${feed.feed_id}`">
      <p class="w-full py-2">{{ feed.contents }}</p>
    </router-link>

    <div class="flex items-center gap-2">
      <Button
        @click="toggleLike"
        type="button"
        variant="ghost"
        class="h-10 p-2 gap-1"
      >
        <Heart />
        <span class="text-sm">{{ feed.likes_cnt }}</span>
      </Button>
      <router-link :to="`/feeds/${feed.feed_id}`">
        <Button type="button" variant="ghost" class="h-10 p-2 gap-1">
          <MessageCircle />
          <span class="text-sm">{{ feed.comments_cnt }}</span>
        </Button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Feed } from '@/types';
import { defineProps } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import FeedDropdownMenu from './FeedDropdownMenu.vue';
import { Heart, MessageCircle } from 'lucide-vue-next';
import { Button } from './ui/button';
import { useUserStore } from '@/stores/userStore';
import { likeFeed, unlikeFeed } from '@/api/feeds';
import { ref } from 'vue';
import { formatDate } from '@vueuse/core';

const userStore = useUserStore();

const p = defineProps({
  feed: {
    type: Object as () => Feed,
    required: true,
  },
});
const isLiked = ref(false); // 기본값은 false로 설정

const isOwner =
  userStore.currentUser &&
  userStore.currentUser.user_id === p.feed.user.user_id;

const toggleLike = async () => {
  try {
    if (isLiked.value) {
      await unlikeFeed(p.feed.feed_id);
      p.feed.likes_cnt--; // 좋아요 수 감소
      isLiked.value = false; // 좋아요 상태 업데이트
    } else {
      await likeFeed(p.feed.feed_id);
      p.feed.likes_cnt++; // 좋아요 수 증가
      isLiked.value = true; // 좋아요 상태 업데이트
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};
</script>
