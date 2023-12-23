<!-- UserProfileEdit.vue -->
<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>댓글 수정</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="handleEditComment" class="grid gap-4 py-4">
        <Label for="contents" class=""> 내용 </Label>
        <Textarea id="contents" class="" v-model="contents" />

        <Button type="submit"> 저장 </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogTitle } from 'radix-vue';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { Comment } from '@/types';
import { useToast } from '../ui/toast';
import { AxiosError } from 'axios';
import { Textarea } from '../ui/textarea';
import { editComment } from '@/api/comments';

const props = defineProps({
  comment: {
    type: Object as () => Comment,
    required: true,
  },
});

const { toast } = useToast();
const router = useRouter();
const userStore = useUserStore();
const contents = ref(props.comment.contents || '');

const handleEditComment = async () => {
  try {
    const curUser = userStore.currentUser;
    if (!curUser) return;
    const updatedField: { contents: undefined | string } = {
      contents:
        props.comment.contents === contents.value ? undefined : contents.value,
    };
    if (!updatedField.contents) {
      throw Error('변경사항이 없습니다.');
    }

    if (updatedField.contents.length === 0) {
      throw Error('내용이 없습니다.');
    }
    await editComment(props.comment.comment_id, updatedField.contents);
    router.go(0);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast({
        variant: 'destructive',
        description: '권한이 없습니다.',
      });
    } else if (error instanceof Error) {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    } else {
      toast({
        variant: 'destructive',
        description: '서버에 문제가 발생했습니다.',
      });
    }
  }
};
</script>
