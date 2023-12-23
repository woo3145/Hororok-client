<template>
  <div class="w-full max-w-screen-md mx-auto py-12">
    <FeedItem v-if="selectedFeed" :feed="selectedFeed" />
    <div class="py-12 space-y-8">
      <CommentCreator v-if="selectedFeed" :feed-id="selectedFeed.feed_id" />

      <div v-if="comments.length === 0" class="py-10 text-center">
        댓글이 없어요 😢
      </div>
      <div v-for="comment in comments" :key="comment.comment_id">
        <CommentItem :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FeedItem from '@/components/FeedItem.vue';
import { useFeedStore } from '@/stores/feedStore';
import { useRoute } from 'vue-router';
import { Comment, Feed } from '@/types';
import CommentItem from '@/components/CommentItem.vue';
import CommentCreator from '@/components/form/CommentCreator.vue';

const feedStore = useFeedStore();
const route = useRoute();

const feedId = ref(Number(route.params.feedId));
const selectedFeed = ref<Feed | null>(null);
const comments = ref<Comment[]>([]);

onMounted(async () => {
  // 선택된 피드와 댓글을 가져옵니다.
  selectedFeed.value = await feedStore.getFeed(feedId.value);
  comments.value = await feedStore.getComments(feedId.value);
});
</script>
