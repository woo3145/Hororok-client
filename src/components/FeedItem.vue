<template>
  <div
    class="feed-item space-y-4 rounded-md px-6 py-6 bg-background border cursor-pointer"
  >
    <div class="flex items-center gap-4">
      <router-link :to="`/users/${feed.user.user_id}`">
        <Avatar class="shrink-0">
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </router-link>

      <div class="w-full flex justify-between">
        <router-link :to="`/users/${feed.user.user_id}`" class="w-full">
          <p class="font-semibold">{{ feed.user?.name }}</p>
          <p class="text-sm text-foreground/60">
            {{ feed.created_at?.toString() }}
          </p>
        </router-link>
        <FeedDropdownMenu :feed="feed" v-if="isOwner" />
      </div>
    </div>
    <p>{{ feed.contents }}</p>

    <div class="flex items-center gap-2">
      <Button variant="ghost" class="h-10 p-2 gap-1">
        <Heart />
        <span class="text-sm">{{ feed.likes_cnt }}</span>
      </Button>
      <Button variant="ghost" class="h-10 p-2 gap-1">
        <MessageCircle />
        <span class="text-sm">{{ feed.comments_cnt }}</span>
      </Button>
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

const userStore = useUserStore();

const p = defineProps({
  feed: {
    type: Object as () => Feed,
    required: true,
  },
});

const isOwner =
  userStore.currentUser &&
  userStore.currentUser.user_id === p.feed.user.user_id;
</script>
