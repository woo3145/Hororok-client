// stores/feeds.ts
import { defineStore } from 'pinia';
import { Feed } from '../types';
import { deleteFeed as _deleteFeed, getFeeds, postFeed } from '@/api/feeds';
import { AxiosError } from 'axios';

export const useFeedStore = defineStore('feeds', {
  state: () => ({
    feeds: [] as Feed[],
  }),
  actions: {
    async fetchFeeds() {
      try {
        const response = await getFeeds();
        this.feeds = response.feeds;
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    },
    async addFeed(contents: string) {
      try {
        await postFeed(contents);
        await this.fetchFeeds();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            throw new Error('로그인이 필요합니다.');
          }
        }
        throw new Error('서버에 문제가 발생하였습니다.');
      }
    },

    async deleteFeed(feedId: number) {
      try {
        await _deleteFeed(feedId);
        await this.fetchFeeds();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            throw new Error('권한이 없습니다.');
          }
        }
        throw new Error('서버에 문제가 발생하였습니다.');
      }
    },
  },
});
