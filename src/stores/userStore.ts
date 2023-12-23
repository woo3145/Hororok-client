import { logout as _logout } from '@/api/auth';
import {
  getCurrentUser,
  editUser,
  EditUserInput,
  getFollowing,
} from '@/api/users';
import { User } from '@/types';
import { defineStore } from 'pinia';

interface State {
  currentUser: User | null;
  followings: User[] | null;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    currentUser: null,
    followings: [],
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },
  actions: {
    async fetchCurrentUser() {
      try {
        const response = await getCurrentUser();
        this.currentUser = response.user;
      } catch (error) {
        console.error('Error fetching current user:', error);
        this.currentUser = null;
      }
    },

    async fetchFollowing() {
      try {
        if (!this.currentUser) return;
        const response = await getFollowing(this.currentUser.user_id);
        this.followings = response.followings;
      } catch (error) {
        console.error('Error fetching following:', error);
        this.followings = [];
      }
    },

    async logout() {
      try {
        await _logout();
        this.currentUser = null;
      } catch (e) {
        this.currentUser = null;
      }
    },

    async updateProfile(userId: number, data: EditUserInput) {
      try {
        if (!this.currentUser) return;
        const res = await editUser(userId, data);
        this.currentUser = {
          ...this.currentUser,
          name: data.name ?? this.currentUser.name,
          nickname: data.nickname ?? this.currentUser.nickname,
          birth: data.birth ?? this.currentUser.birth,
          gender: data.gender ?? this.currentUser.gender,
        };
      } catch (e) {}
    },
  },
});
