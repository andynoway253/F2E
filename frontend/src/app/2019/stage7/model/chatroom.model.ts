export interface user {
  userId: string;
  userName: string;
  userConnect: string[];
}

export interface messages {
  [key: string]: Array<{
    roomId: string;
    type: string;
    text: string;
    userName: string;
  }>;
}

export interface notify {
  receiverId: string;
  userId: string;
  userName: string;
  text: string;
}
