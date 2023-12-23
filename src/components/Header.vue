<template>
  <header
    class="absolute top-0 z-40 flex items-center justify-between w-full h-16 px-8 shadow-md bg-background"
  >
    <router-link to="/">
      <Button variant="ghost" class="text-xl font-semibold">Hororok</Button>
    </router-link>

    <DropdownMenu v-if="userStore.currentUser">
      <DropdownMenuTrigger class="flex">
        <Avatar>
          <AvatarImage src="" alt="profile image" />
          <AvatarFallback>{{ userStore.currentUser.nickname }}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel class="font-normal flex">
          <p class="text-sm font-medium leading-none">
            {{ userStore.currentUser.name }}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <router-link :to="`/users/${userStore.currentUser.user_id}`">
          <DropdownMenuItem class="cursor-pointer">
            마이페이지
          </DropdownMenuItem>
        </router-link>
        <DropdownMenuItem
          @click="userStore.logout"
          class="text-destructive cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <div v-else>
      <router-link to="/login">
        <Button>로그인</Button>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserStore } from '@/stores/userStore';
import { Button } from './ui/button';

const userStore = useUserStore();
</script>
