<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-3">
        <div class="grid gap-1">
          <Label for="id"> 아이디 </Label>
          <Input
            id="id"
            type="text"
            placeholder="아이디"
            auto-capitalize="none"
            auto-complete="id"
            auto-correct="off"
            :disabled="isLoading"
            v-model="id"
          />
        </div>
        <div class="grid gap-1">
          <Label for="password"> 패스워드 </Label>
          <Input
            id="password"
            type="password"
            placeholder="패스워드"
            auto-capitalize="none"
            auto-correct="off"
            :disabled="isLoading"
            v-model="password"
          />
        </div>
        <Button :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          로그인
        </Button>
        <p v-if="errorMessage" class="text-sm text-destructive">
          {{ errorMessage }}
        </p>
        <div class="mx-auto">
          <span class="text-sm text-foreground/70"
            >계정이 아직 없으신가요?</span
          >
          <a href="/register">
            <Button variant="link" type="button">회원가입</Button>
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-vue-next';
import { login } from '@/api/auth';
import { AxiosError } from 'axios';
import { useUserStore } from '@/stores/userStore';

const id = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();
const userStore = useUserStore();

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // 로그인 API 호출
    await login({ id: id.value, password: password.value });
    await userStore.fetchCurrentUser();

    router.push('/');
  } catch (error) {
    // 에러 처리
    // 예를 들어, 에러 메시지 표시
    if (error instanceof AxiosError) {
      console.log(error);
      errorMessage.value = error.response?.data?.message || '로그인 실패';
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
