<template>
  <header
    class="absolute top-0 z-40 flex items-center justify-between w-full h-16 px-8 shadow-md bg-background"
  >
    <a href="/" class="text-xl font-semibold">Hororok</a>

    <DropdownMenu v-if="userStore.isLoggedIn">
      <DropdownMenuTrigger class="flex">
        <Avatar>
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel class="font-normal flex">
          <p class="text-sm font-medium leading-none">woo3145</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <a href="/profile">
          <DropdownMenuItem class="cursor-pointer"> Profile </DropdownMenuItem>
        </a>

        <DropdownMenuItem class="text-destructive cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <div v-else>
      <a href="/login">
        <Button>로그인</Button>
      </a>
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
