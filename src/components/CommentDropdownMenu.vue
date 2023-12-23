<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      ><Button variant="ghost" class="w-10 h-10 p-0"> <MoreVertical /> </Button
    ></DropdownMenuTrigger>
    <DropdownMenuContent>
      <CommentEdit :comment="comment">
        <DropdownMenuItem @select="handleSelect" class="cursor-pointer"
          >수정</DropdownMenuItem
        >
      </CommentEdit>

      <CommentDeleteConfirm :comment-id="comment.comment_id">
        <DropdownMenuItem
          @select="handleSelect"
          class="text-destructive cursor-pointer focus:text-destructive"
        >
          삭제
        </DropdownMenuItem>
      </CommentDeleteConfirm>
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
import CommentDeleteConfirm from './form/CommentDeleteConfirm.vue';
import CommentEdit from './form/CommentEdit.vue';
import { Comment } from '@/types';

const handleSelect = (event: Event) => {
  event.preventDefault();
};

defineProps({
  comment: {
    type: Object as () => Comment,
    required: true,
  },
});
</script>
