export interface user {
  userId: string;
  userName: string;
}

export interface messages {
  [key: string]: Array<{
    roomId: string;
    type: string;
    text: string;
    userName: string;
    accept?: string;
  }>;
}

export interface message {
  roomId: string;
  type: string;
  text: string;
  userName: string;
  accept?: string;
}
