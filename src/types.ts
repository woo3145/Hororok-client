// types.ts
export interface User {
  user_id: number;
  id: string;
  name: string;
  nickname: string;
  birth: Date;
  gender: string;
}

export interface Feed {
  feed_id: number;
  contents: string;
  user: User;
  createdAt: Date;

  likes_cnt: number;
  comments_cnt: number;
}
