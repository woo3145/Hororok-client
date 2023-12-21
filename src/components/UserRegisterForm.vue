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
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="grid gap-1">
            <Label for="birth"> 생일 </Label>
            <Input
              id="nickname"
              type="date"
              placeholder="생일"
              auto-capitalize="none"
              auto-correct="off"
              :disabled="isLoading"
            />
          </div>
          <div class="grid gap-1">
            <Label for="gender"> 성별 </Label>
            <Select>
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
          />
        </div>
        <Button :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          회원가입
        </Button>
        <div class="mx-auto">
          <span class="text-sm text-foreground/70"
            >이미 계정이 있으신가요?</span
          >
          <a href="#/login">
            <Button variant="link" type="button">로그인</Button>
          </a>
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
// import { register } from '@/api/auth';

const isLoading = ref(false);
async function onSubmit(event: Event) {
  event.preventDefault();
  // const res = await register({});
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}
</script>
