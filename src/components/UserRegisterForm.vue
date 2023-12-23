<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-3">
        <div class="grid grid-cols-2 gap-2">
          <div class="grid gap-1">
            <Label for="name"> 이름 </Label>
            <Input
              id="name"
              type="text"
              placeholder="이름"
              auto-capitalize="none"
              auto-correct="off"
              :disabled="isLoading"
              v-model="name"
            />
          </div>
          <div class="grid gap-1">
            <Label for="nickname"> 닉네임 </Label>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임"
              auto-capitalize="none"
              auto-correct="off"
              :disabled="isLoading"
              v-model="nickname"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="grid gap-1">
            <Label for="birth"> 생일 </Label>
            <Input
              id="birth"
              type="date"
              placeholder="생일"
              auto-capitalize="none"
              auto-correct="off"
              :disabled="isLoading"
              v-model="birth"
            />
          </div>
          <div class="grid gap-1">
            <Label for="gender"> 성별 </Label>
            <Select v-model="gender" default-value="M">
              <SelectTrigger>
                <SelectValue placeholder="성별" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="M"> 남성 </SelectItem>
                  <SelectItem value="W"> 여성 </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
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
          회원가입
        </Button>
        <p v-if="errorMessage" class="text-sm text-destructive">
          {{ errorMessage }}
        </p>
        <div class="mx-auto">
          <span class="text-sm text-foreground/70"
            >이미 계정이 있으신가요?</span
          >
          <router-link to="/login">
            <Button variant="link" type="button">로그인</Button>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-vue-next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { register } from '@/api/auth';
import { AxiosError } from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();

const isLoading = ref(false);
const name = ref('');
const nickname = ref('');
const birth = ref('');
const gender = ref<'M' | 'W'>('M');
const id = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;
  errorMessage.value = '';

  try {
    await register({
      id: id.value,
      password: password.value,
      name: name.value,
      nickname: nickname.value,
      birth: new Date(birth.value),
      gender: gender.value,
    });
    toast({
      description: '성공적으로 회원가입을 하였습니다.',
    });

    router.push('/login');
  } catch (error) {
    if (error instanceof AxiosError) {
      errorMessage.value = error.response?.data?.message || '회원가입 실패';
    } else if (error instanceof Error) {
      errorMessage.value = error.message || '회원가입 실패';
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
