<template>
  <header class="flex items-center justify-between w-full py-3 px-8 shadow-md">
    <a href="#/" class="text-xl font-semibold">Hororok</a>

    <DropdownMenu>
      <DropdownMenuTrigger>
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
        <a href="/#/profile">
          <DropdownMenuItem class="cursor-pointer"> Profile </DropdownMenuItem>
        </a>

        <DropdownMenuItem class="text-destructive cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
</script>
