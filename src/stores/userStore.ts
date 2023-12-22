// stores/userStore.js 또는 stores/userStore.ts
import { getCurrentUser } from '@/api/users';
import { User } from '@/types';
import { defineStore } from 'pinia';

interface State {
  currentUser: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    currentUser: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },
  actions: {
    async fetchCurrentUser() {
      try {
        const response = await getCurrentUser();
        console.log(response);
        this.currentUser = response.user;
      } catch (error) {
        console.error('Error fetching current user:', error);
        this.currentUser = null;
      }
    },
  },
});
