<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      ><Button variant="ghost" class="w-10 h-10 p-0"> <MoreVertical /> </Button
    ></DropdownMenuTrigger>
    <DropdownMenuContent>
      <AlertDialog>
        <DropdownMenuItem class="cursor-pointer">수정</DropdownMenuItem>

        <AlertDialogTrigger class="w-full" as-child>
          <DropdownMenuItem
            @select="handleSelect"
            class="text-destructive cursor-pointer focus:text-destructive"
          >
            삭제
          </DropdownMenuItem>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말로 피드를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 취소할 수 없으며, 서버에서 데이터가 완전히 제거됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction @click="handleDelete">확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MoreVertical } from 'lucide-vue-next';
import { Button } from './ui/button';
import { deleteFeed } from '../api/feeds';

const handleSelect = (event: Event) => {
  event.preventDefault();
};

const props = defineProps({
  feedId: {
    type: Number,
    required: true,
  },
});

const handleDelete = async () => {
  try {
    await deleteFeed(props.feedId);
    console.log('Feed deleted successfully');
  } catch (error) {
    console.error('Error deleting the feed:', error);
  }
};
</script>
