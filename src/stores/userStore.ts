import { logout as _logout } from '@/api/auth';
import {
  getCurrentUser,
  editUser,
  EditUserInput,
  getFollowing,
  getLikedFeeds,
} from '@/api/users';
import { User } from '@/types';
import { defineStore } from 'pinia';

interface State {
  currentUser: User | null;
  following: User[];
  likedFeeds: number[];
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    currentUser: null,
    following: [],
    likedFeeds: [],
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
        this.following = response.following;
      } catch (error) {
        console.error('Error fetching following:', error);
        this.following = [];
      }
    },
    async fetchLikedFeeds() {
      try {
        if (!this.currentUser) return;
        const response = await getLikedFeeds(this.currentUser.user_id);
        this.likedFeeds = response.liked_feeds;
      } catch (error) {
        console.error('Error fetching following:', error);
        this.likedFeeds = [];
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
        await editUser(userId, data);
        this.currentUser = {
          ...this.currentUser,
          name: data.name ?? this.currentUser.name,
          nickname: data.nickname ?? this.currentUser.nickname,
          birth: data.birth ?? this.currentUser.birth,
          gender: data.gender ?? this.currentUser.gender,
        };
      } catch (e) {}
    },

    addToFollowing(user: User) {
      if (!this.following.some((u) => u.user_id === user.user_id)) {
        this.following.push(user);
      }
    },

    removeFromFollowing(userId: number) {
      this.following = this.following.filter((u) => u.user_id !== userId);
    },

    addToLikedFeeds(feedId: number) {
      if (!this.likedFeeds.includes(feedId)) {
        this.likedFeeds.push(feedId);
      }
    },

    removeFromLikedFeeds(feedId: number) {
      this.likedFeeds = this.likedFeeds.filter((f) => f !== feedId);
    },
  },
});
