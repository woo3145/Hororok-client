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
import { postFeed } from '@/api/feeds';

interface FeedData {
  contents: string;
}

const feedData = ref<FeedData>({ contents: '' });

const submitFeed = async () => {
  if (!feedData.value.contents) {
    alert('내용을 입력해주세요.');
    return;
  }

  try {
    const response = await postFeed(feedData.value.contents);
    console.log(response.data);
    feedData.value.contents = '';
  } catch (error) {
    console.error('Error posting the feed:', error);
  }
};
</script>
