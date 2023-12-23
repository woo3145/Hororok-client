<template>
  <div
    class="feed-item space-y-4 rounded-md px-6 py-6 bg-background border cursor-pointer"
  >
    <div class="flex items-center gap-4">
      <router-link :to="`/users/${feed.user?.user_id}`">
        <Avatar class="shrink-0">
          <AvatarImage src="" alt="profile image" />
          <AvatarFallback>{{ feed.user?.nickname }}</AvatarFallback>
        </Avatar>
      </router-link>

      <div class="w-full flex justify-between">
        <router-link :to="`/users/${feed.user?.user_id}`" class="w-full">
          <p class="font-semibold">{{ feed.user?.nickname }}</p>
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
import { computed, defineProps } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import FeedDropdownMenu from './FeedDropdownMenu.vue';
import { Heart, MessageCircle } from 'lucide-vue-next';
import { Button } from './ui/button';
import { useUserStore } from '@/stores/userStore';
import { likeFeed, unlikeFeed } from '@/api/feeds';
import { formatDate } from '@vueuse/core';
import { useToast } from './ui/toast';

const userStore = useUserStore();
const { toast } = useToast();

const p = defineProps({
  feed: {
    type: Object as () => Feed,
    required: true,
  },
});

const isLiked = computed(() => {
  return userStore.likedFeeds?.includes(p.feed.feed_id);
});

const isOwner =
  userStore.currentUser &&
  userStore.currentUser.user_id === p.feed.user.user_id;

const toggleLike = async () => {
  if (!userStore.currentUser) {
    toast({
      description: '로그인이 필요합니다.',
      variant: 'destructive',
    });
    return;
  }
  try {
    if (isLiked.value) {
      await unlikeFeed(p.feed.feed_id);
      p.feed.likes_cnt--; // 좋아요 수 감소
      userStore.removeFromLikedFeeds(p.feed.feed_id);
    } else {
      await likeFeed(p.feed.feed_id);
      p.feed.likes_cnt++; // 좋아요 수 증가
      userStore.addToLikedFeeds(p.feed.feed_id);
    }
  } catch (error) {
    toast({
      description: '서버에 문제가 발생하였습니다.',
      variant: 'destructive',
    });
  }
};
</script>
