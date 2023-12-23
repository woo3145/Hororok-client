<template>
  <div
    class="absolute top-0 container bg-background z-50 h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <a
      href="/"
      :class="
        cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )
      "
    >
      뒤로가기
    </a>
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
    >
      <div
        class="absolute inset-0 bg-zinc-900 flex items-center justify-center"
      >
        <img src="@/assets/register.png" alt="register img" />
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
      >
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">회원가입</h1>
        </div>
        <UserRegisterForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserRegisterForm from '@/components/UserRegisterForm.vue';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
</script>
