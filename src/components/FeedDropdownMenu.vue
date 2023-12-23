<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      ><Button variant="ghost" class="w-10 h-10 p-0"> <MoreVertical /> </Button
    ></DropdownMenuTrigger>
    <DropdownMenuContent>
      <FeedEdit :feed="feed">
        <DropdownMenuItem @select="handleSelect" class="cursor-pointer"
          >수정</DropdownMenuItem
        >
      </FeedEdit>

      <FeedDeleteConfirm :feed-id="feed.feed_id">
        <DropdownMenuItem
          @select="handleSelect"
          class="text-destructive cursor-pointer focus:text-destructive"
        >
          삭제
        </DropdownMenuItem>
      </FeedDeleteConfirm>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MoreVertical } from 'lucide-vue-next';
import { Button } from './ui/button';
import FeedDeleteConfirm from './form/FeedDeleteConfirm.vue';
import FeedEdit from './form/FeedEdit.vue';
import { Feed } from '@/types';

const handleSelect = (event: Event) => {
  event.preventDefault();
};

defineProps({
  feed: {
    type: Object as () => Feed,
    required: true,
  },
});
</script>
