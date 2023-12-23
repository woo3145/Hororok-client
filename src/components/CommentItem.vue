<template>
  <div class="flex gap-4">
    <Avatar class="w-10 h-10 border">
      <AvatarImage :alt="`userProfile`" src="/placeholder-user.jpg" />
      <AvatarFallback>{{ comment.user?.name }}</AvatarFallback>
    </Avatar>
    <div class="grid gap-1.5 w-full">
      <div class="flex items-center gap-2">
        <div class="font-semibold">@{{ comment.user?.nickname }}</div>
        <div class="text-gray-500 text-xs dark:text-gray-400">
          {{ formatDate(new Date(comment.created_at), 'YYYY-MM-DD HH:mm:ss') }}
        </div>
      </div>
      <div>{{ comment.contents }}</div>
    </div>

    <CommentDropdownMenu v-if="isOwner" :comment="comment" />
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';
import { formatDate } from '@vueuse/core';
import CommentDropdownMenu from './CommentDropdownMenu.vue';
import { useUserStore } from '@/stores/userStore';
import { Comment } from '@/types';

const p = defineProps({
  comment: {
    type: Object as () => Comment,
    required: true,
  },
});
const userStore = useUserStore();

const isOwner =
  userStore.currentUser &&
  userStore.currentUser.user_id === p.comment.user.user_id;
</script>
