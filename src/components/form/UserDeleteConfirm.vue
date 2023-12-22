<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>정말로 회원 탈퇴를 하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription>
          이 작업은 취소할 수 없으며, 작성한 글, 댓글, 좋아요 등 완전히
          삭제됩니다.
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
import { deleteUser } from '@/api/users';
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
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { useToast } from '../ui/toast';

const userStore = useUserStore();
const router = useRouter();
const { toast } = useToast();

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const handleDelete = async () => {
  try {
    await deleteUser(props.userId);
    await userStore.logout();
    toast({
      description: '성공적으로 회원탈퇴 하였습니다.',
    });
    router.push('/');
  } catch (e) {
    console.error('회원 탈퇴 실패:', e);
  }
};
</script>
