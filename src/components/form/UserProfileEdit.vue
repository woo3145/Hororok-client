<!-- UserProfileEdit.vue -->
<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>프로필 수정</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="updateProfile" class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> 이름 </Label>
          <Input id="name" class="col-span-3" v-model="name" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="nickname" class="text-right"> 닉네임 </Label>
          <Input id="nickname" class="col-span-3" v-model="nickname" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="birth" class="text-right"> 생일 </Label>
          <Input id="birth" type="date" class="col-span-3" v-model="birth" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="gender" class="text-right"> 성별 </Label>
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
        <Button type="submit"> 저장 </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogTitle } from 'radix-vue';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { EditUserInput } from '@/api/users';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const name = ref(userStore.currentUser?.name || '');
const nickname = ref(userStore.currentUser?.nickname || '');
const birth = ref(userStore.currentUser?.birth.toString() || '');
const gender = ref((userStore.currentUser?.gender as 'W' | 'M') || 'M');

watch(userStore, (newState) => {
  name.value = newState.currentUser?.name || '';
  nickname.value = newState.currentUser?.nickname || '';
  birth.value = newState.currentUser?.birth.toString() || '';
  gender.value = (newState.currentUser?.gender as 'W' | 'M') || 'M';
});

const updateProfile = async () => {
  // 프로필 업데이트 로직
  try {
    const curUser = userStore.currentUser;
    if (!curUser) return;
    console.log(name.value, nickname.value, birth.value, gender.value);
    const updatedField: EditUserInput = {
      name: curUser.name === name.value ? undefined : name.value,
      nickname:
        curUser.nickname === nickname.value ? undefined : nickname.value,
      birth:
        curUser.birth.toString() === birth.value
          ? undefined
          : new Date(birth.value),
      gender: curUser.gender === gender.value ? undefined : gender.value,
    };
    await userStore.updateProfile(curUser.user_id, updatedField);
    router.go(0);
  } catch (error) {
    console.error('Profile update failed:', error);
  }
};
</script>
