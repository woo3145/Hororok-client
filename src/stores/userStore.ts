// stores/userStore.js 또는 stores/userStore.ts
import { getCurrentUser } from '@/api/users';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
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
