export type Conversation = {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
};

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
  type: 'message' | 'friend' | 'reminder' | 'account';
};

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Chat: { name: string; avatar: string; online: boolean };
};

export type MainTabParamList = {
  Home: undefined;
  Contacts: undefined;
  Notifications: undefined;
  Settings: undefined;
};
