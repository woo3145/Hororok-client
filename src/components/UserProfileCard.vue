<template>
  <div v-if="user === undefined">
    <div>Loading...</div>
  </div>
  <div v-else-if="user" class="space-y-8 p-8 border rounded-md bg-background">
    <div class="flex items-end justify-between gap-4">
      <Avatar class="w-40 h-40">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div
        v-if="
          userStore.currentUser &&
          userStore.currentUser.user_id === user.user_id
        "
      ></div>
      <Button v-else variant="outline" class="rounded-full gap-2">
        <UserIcon class="w-4 h-4" />
        <span>팔로우</span>
      </Button>
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
import { getUser } from '@/api/users';
import { User } from '@/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { User as UserIcon } from 'lucide-vue-next';
import { useUserStore } from '@/stores/userStore';
import UserProfileDropdownMenu from './UserProfileDropdownMenu.vue';

const route = useRoute();
const user = ref<User | null | undefined>(undefined);

const userStore = useUserStore();

const fetchUser = async () => {
  try {
    const userId = Number(route.params.userId);
    if (!Number.isInteger(userId)) return;
    const response = await getUser(userId);
    user.value = response.user;
  } catch (error) {
    user.value = null;
    console.log('Error fetching user:', error);
  }
};
onMounted(fetchUser);
</script>
