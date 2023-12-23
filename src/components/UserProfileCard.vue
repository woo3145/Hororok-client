<template>
  <div v-if="user === undefined">
    <div>Loading...</div>
  </div>
  <div v-else-if="user" class="space-y-8 p-8 border rounded-md bg-background">
    <div class="flex items-end justify-between gap-4">
      <Avatar class="w-40 h-40">
        <AvatarImage src="" alt="profile image" />
        <AvatarFallback>{{ user.nickname }}</AvatarFallback>
      </Avatar>

      <div
        v-if="
          userStore.currentUser &&
          userStore.currentUser.user_id === user.user_id
        "
      ></div>
      <div v-else>
        <Button
          variant="outline"
          class="rounded-full gap-2"
          @click="toggleFollow"
        >
          <UserIcon class="w-4 h-4" />
          <span v-if="isFollowing">{{ '언팔로우' }}</span>
          <span v-else>{{ '팔로우' }}</span>
        </Button>
      </div>
    </div>

    <div class="flex items-end justify-between">
      <div class="space-y-2">
        <p class="text-3xl font-semibold">{{ user.nickname }}</p>
        <p class="text-md text-foreground/60"># {{ user.id }}</p>
      </div>
      <div class="flex items-center gap-4">
        <Button variant="outline" type="button"
          >Followers {{ user.followers_cnt }}</Button
        >
        <Button variant="outline" type="button"
          >Following {{ user.following_cnt }}</Button
        >
        <UserProfileDropdownMenu
          :user="userStore.currentUser"
          v-if="
            userStore.currentUser &&
            userStore.currentUser.user_id === user.user_id
          "
        />
      </div>
    </div>
  </div>
  <div v-else>404</div>
</template>

<script setup lang="ts">
import { followUser, getUser, unfollowUser } from '@/api/users';
import { User } from '@/types';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { User as UserIcon } from 'lucide-vue-next';
import { useUserStore } from '@/stores/userStore';
import UserProfileDropdownMenu from './UserProfileDropdownMenu.vue';
import { useToast } from './ui/toast';

const route = useRoute();
const user = ref<User | null | undefined>(undefined);
const userId = computed(() => Number(route.params.userId));

const { toast } = useToast();

const userStore = useUserStore();

const fetchUser = async (userId: number) => {
  try {
    if (!Number.isInteger(userId)) return;
    const response = await getUser(userId);
    user.value = response.user;
  } catch (error) {
    user.value = null;
    console.log('Error fetching user:', error);
  }
};

const isFollowing = computed(() => {
  return userStore.following?.some((u) => u.user_id === userId.value);
});

const toggleFollow = async () => {
  if (!user.value) return;
  if (!userStore.currentUser) {
    toast({
      description: '로그인이 필요합니다.',
      variant: 'destructive',
    });
    return;
  }
  try {
    if (isFollowing.value) {
      await unfollowUser(userStore.currentUser.user_id, user.value.user_id);
      // 팔로우 상태 업데이트 로직 (여기서는 userStore.following 업데이트)
      userStore.removeFromFollowing(user.value.user_id);
      if (user.value.followers_cnt !== undefined) {
        user.value.followers_cnt -= 1; // 팔로워 수 감소
      }
    } else {
      await followUser(userStore.currentUser.user_id, user.value.user_id);
      // 팔로우 상태 업데이트 로직 (여기서는 userStore.following 업데이트)
      userStore.addToFollowing(user.value);
      if (user.value.followers_cnt !== undefined) {
        user.value.followers_cnt += 1; // 팔로워 수 증가
      }
    }
  } catch (error) {
    console.error('Error toggling follow:', error);
    toast({
      description: '팔로우 상태 변경에 실패했습니다.',
      variant: 'destructive',
    });
  }
};
watch(
  userId,
  (newUserId) => {
    fetchUser(newUserId);
  },
  { immediate: true }
);
</script>
