<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>정말로 피드를 삭제 하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription>
          이 작업은 취소할 수 없으며, 피드, 댓글, 좋아요 등 완전히 삭제됩니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction @click="handleDelete">확인</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
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
import { useToast } from '../ui/toast';
import { useFeedStore } from '@/stores/feedStore';

const feedStore = useFeedStore();
const { toast } = useToast();

const props = defineProps({
  feedId: {
    type: Number,
    required: true,
  },
});

const handleDelete = async () => {
  try {
    await feedStore.deleteFeed(props.feedId);
    toast({
      description: '성공적으로 피드를 삭제하였습니다.',
    });
  } catch (e) {
    if (e instanceof Error) {
      toast({
        variant: 'destructive',
        description: e.message,
      });
    }
  }
};
</script>
