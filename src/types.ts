// types.ts
export interface User {
  user_id: number;
  name: string;
}

export interface Feed {
  feed_id: number;
  contents: string;
  user: User;
  createdAt: Date;

  likes_cnt: number;
  comments_cnt: number;
}
