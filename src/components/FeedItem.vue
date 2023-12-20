<template>
  <div class="feed-item space-y-4 rounded-md px-6 py-6 bg-background border">
    <div class="flex items-center gap-4">
      <Avatar class="shrink-0">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div class="w-full flex justify-between">
        <div class="w-full">
          <p class="font-semibold">{{ feed.user?.name }}</p>
          <p class="text-sm text-foreground/60">
            {{ feed.createdAt?.toString() }}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            ><Button variant="ghost" class="w-10 h-10 p-0">
              <MoreVertical /> </Button
          ></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem class="cursor-pointer">수정</DropdownMenuItem>
            <DropdownMenuItem class="text-destructive cursor-pointer"
              >삭제</DropdownMenuItem
            >
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <p>{{ feed.contents }}</p>

    <div class="flex items-center gap-2">
      <Button variant="ghost" class="h-10 p-2 gap-1">
        <Heart />
        <span class="text-sm">4</span>
      </Button>
      <Button variant="ghost" class="h-10 p-2 gap-1">
        <MessageCircle />
        <span class="text-sm">4</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Feed } from '@/types';
import { defineProps } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Heart, MessageCircle } from 'lucide-vue-next';
import { Button } from './ui/button';
defineProps({
  feed: {
    type: Object as () => Feed,
    required: true,
  },
});
</script>
