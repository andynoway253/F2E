export interface user {
  userId: string;
  userName: string;
  userConnect: string[];
}

export interface notify {
  receiverId: string;
  userId: string;
  userName: string;
  text: string;
}
