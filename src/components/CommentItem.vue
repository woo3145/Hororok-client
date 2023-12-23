<template>
  <div class="flex gap-4">
    <Avatar class="w-10 h-10 border">
      <AvatarImage :alt="`userProfile`" src="/placeholder-user.jpg" />
      <AvatarFallback>{{ comment.user?.name }}</AvatarFallback>
    </Avatar>
    <div class="grid gap-1.5">
      <div class="flex items-center gap-2">
        <div class="font-semibold">@{{ comment.user?.nickname }}</div>
        <div class="text-gray-500 text-xs dark:text-gray-400">
          {{ comment.created_at.toString() }}
        </div>
      </div>
      <div>{{ comment.contents }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';
import { Comment } from '@/types';

defineProps({
  comment: {
    type: Object as () => Comment,
    required: true,
  },
});
</script>
