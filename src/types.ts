// types.ts
export interface User {
  user_id: number;
  id: string;
  name: string;
  nickname: string;
  birth: Date;
  gender: string;

  followers_cnt: number;
  following_cnt: number;
}

export interface Feed {
  feed_id: number;
  contents: string;
  user: User;
  createdAt: Date;

  likes_cnt: number;
  comments_cnt: number;
}
