import type { Contact, Conversation, NotificationItem } from '../types';

export const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Minh Anh',
    message: 'Cuối tuần mình gặp nhau nhé!',
    time: '09:42',
    unread: 2,
    avatar: 'https://i.pravatar.cc/150?img=47',
    online: true,
  },
  {
    id: '2',
    name: 'Tuấn Khang',
    message: 'Mình đã gửi tài liệu cho bạn rồi.',
    time: '08:15',
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?img=12',
    online: true,
  },
  {
    id: '3',
    name: 'Nhóm Mobile Dev',
    message: 'Hà: Bản demo trông ổn lắm!',
    time: 'Hôm qua',
    unread: 5,
    avatar: 'https://i.pravatar.cc/150?img=5',
    online: false,
  },
  {
    id: '4',
    name: 'Gia Hân',
    message: 'Cảm ơn bạn nhiều nha.',
    time: 'T.2',
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?img=32',
    online: false,
  },
  {
    id: '5',
    name: 'Đức Nam',
    message: 'Bạn kiểm tra giúp mình nhé.',
    time: 'T.7',
    unread: 1,
    avatar: 'https://i.pravatar.cc/150?img=11',
    online: true,
  },
];

export const contacts: Contact[] = [
  ...conversations
    .filter(item => !item.name.startsWith('Nhóm'))
    .map(item => ({
      id: item.id,
      name: item.name,
      avatar: item.avatar,
      online: item.online,
      lastSeen: item.online ? 'Đang hoạt động' : 'Hoạt động 25 phút trước',
    })),
  {
    id: '6',
    name: 'Khánh Linh',
    avatar: 'https://i.pravatar.cc/150?img=44',
    online: false,
    lastSeen: 'Hoạt động 2 giờ trước',
  },
  {
    id: '7',
    name: 'Hoàng Long',
    avatar: 'https://i.pravatar.cc/150?img=15',
    online: true,
    lastSeen: 'Đang hoạt động',
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Tin nhắn mới',
    content: 'Minh Anh đã gửi cho bạn một tin nhắn.',
    time: '5 phút trước',
    read: false,
    type: 'message',
  },
  {
    id: '2',
    title: 'Lời mời kết bạn',
    content: 'Hoàng Long muốn kết nối với bạn.',
    time: '30 phút trước',
    read: false,
    type: 'friend',
  },
  {
    id: '3',
    title: 'Nhắc nhở',
    content: 'Bạn có 5 tin nhắn chưa đọc trong Nhóm Mobile Dev.',
    time: '2 giờ trước',
    read: true,
    type: 'reminder',
  },
  {
    id: '4',
    title: 'Cập nhật tài khoản',
    content: 'Ảnh đại diện của bạn đã được cập nhật.',
    time: 'Hôm qua',
    read: true,
    type: 'account',
  },
];
