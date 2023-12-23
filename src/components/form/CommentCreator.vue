<template>
  <div>
    <form
      @submit.prevent="submitComment"
      class="flex flex-col h-auto space-y-2"
    >
      <Textarea
        v-model="contents"
        class="h-[100px] text-lg"
        placeholder="내용을 입력해주세요."
      />
      <Button type="submit" class="">댓글 작성</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import { postComment } from '@/api/comments';
import { useToast } from '../ui/toast';
import { useRouter } from 'vue-router';
import { AxiosError } from 'axios';

const p = defineProps({
  feedId: {
    type: Number,
    required: true,
  },
});

const { toast } = useToast();
const router = useRouter();
const contents = ref<string>('');

const submitComment = async () => {
  if (!contents.value) {
    alert('내용을 입력해주세요.');
    return;
  }

  try {
    await postComment(p.feedId, contents.value);

    contents.value = '';
    router.go(0);
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast({
        variant: 'destructive',
        description: '로그인이 필요합니다.',
      });
    } else if (error instanceof Error) {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    } else {
      toast({
        variant: 'destructive',
        description: '서버에 문제가 발생하였습니다.',
      });
    }
  }
};
</script>
