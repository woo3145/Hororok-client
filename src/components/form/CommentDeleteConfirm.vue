<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>정말로 댓글을 삭제 하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription>
          이 작업은 취소할 수 없으며, 서버에서 완전히 삭제됩니다.
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
import { deleteComment } from '@/api/comments';
import { useRouter } from 'vue-router';

const { toast } = useToast();
const router = useRouter();

const props = defineProps({
  commentId: {
    type: Number,
    required: true,
  },
});

const handleDelete = async () => {
  try {
    await deleteComment(props.commentId);
    toast({
      description: '성공적으로 댓글을 삭제하였습니다.',
    });
    router.go(0);
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
