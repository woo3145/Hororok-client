<template>
  <div>
    <form
      @submit.prevent="submitFeed"
      class="relative flex flex-col h-auto space-y-2"
    >
      <Textarea
        v-model="feedData.contents"
        class="h-[140px] text-lg"
        placeholder="내용을 입력해주세요."
      />
      <Button type="submit" class="absolute bottom-4 right-8">Post Feed</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import { useToast } from './ui/toast';
import { useFeedStore } from '@/stores/feedStore';

interface FeedData {
  contents: string;
}

const { toast } = useToast();
const feedData = ref<FeedData>({ contents: '' });
const feedStore = useFeedStore();

const submitFeed = async () => {
  if (!feedData.value.contents) {
    alert('내용을 입력해주세요.');
    return;
  }

  try {
    await feedStore.addFeed(feedData.value.contents);

    feedData.value.contents = '';
  } catch (error) {
    if (error instanceof Error) {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    }
  }
};
</script>
