<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      ><Button variant="outline" class="w-10 h-10 p-0">
        <MoreHorizontal /> </Button
    ></DropdownMenuTrigger>
    <DropdownMenuContent>
      <UserProfileEdit :user="user">
        <DropdownMenuItem @select="handleSelect" class="cursor-pointer"
          >프로필 수정</DropdownMenuItem
        >
      </UserProfileEdit>
      <UserDeleteConfirm :user-id="user.user_id">
        <DropdownMenuItem
          @select="handleSelect"
          class="text-destructive cursor-pointer focus:text-destructive"
        >
          회원 탈퇴
        </DropdownMenuItem>
      </UserDeleteConfirm>
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
import UserDeleteConfirm from './form/UserDeleteConfirm.vue';
import UserProfileEdit from '@/components/form/UserProfileEdit.vue';

import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-vue-next';
import { User } from '@/types';

const handleSelect = (event: Event) => {
  event.preventDefault();
};

defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
});
</script>
