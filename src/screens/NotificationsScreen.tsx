import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bell,
  MessageCircle,
  UserPlus,
  UserRoundCheck,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { initialNotifications } from '../data/mockData';
import { colors } from '../theme/colors';
import type { NotificationItem } from '../types';

const notificationIcons: Record<NotificationItem['type'], LucideIcon> = {
  message: MessageCircle,
  friend: UserPlus,
  reminder: Bell,
  account: UserRoundCheck,
};

export function NotificationsScreen() {
  const [items, setItems] = useState(initialNotifications);
  const unreadCount = items.filter(item => !item.read).length;
  const markRead = (id: string) =>
    setItems(current =>
      current.map(item => (item.id === id ? { ...item, read: true } : item)),
    );
  const markAllRead = () =>
    setItems(current => current.map(item => ({ ...item, read: true })));

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Thông báo</Text>
          <Text style={styles.subtitle}>{unreadCount} thông báo chưa đọc</Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead} style={styles.markAll}>
            <Text style={styles.markAllText}>Đọc tất cả</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const Icon = notificationIcons[item.type];
          return (
            <TouchableOpacity
              style={[styles.card, !item.read && styles.unreadCard]}
              onPress={() => markRead(item.id)}
              activeOpacity={item.read ? 1 : 0.75}
            >
              <View style={[styles.icon, !item.read && styles.unreadIcon]}>
                <Icon
                  size={21}
                  color={item.read ? colors.textSecondary : colors.primary}
                />
              </View>
              <View style={styles.content}>
                <View style={styles.rowBetween}>
                  <Text
                    style={[styles.cardTitle, !item.read && styles.unreadTitle]}
                  >
                    {item.title}
                  </Text>
                  {!item.read && <View style={styles.dot} />}
                </View>
                <Text style={styles.body}>{item.content}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
  },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  markAll: {
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
  },
  markAllText: { fontSize: 12, color: colors.primaryDark, fontWeight: '700' },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 15,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 11,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    backgroundColor: '#F8FBFA',
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 9,
    backgroundColor: '#EDF1F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadIcon: { backgroundColor: colors.primarySoft },
  content: { flex: 1, marginLeft: 12 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  unreadTitle: { fontWeight: '800', color: colors.text },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent },
  body: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: 4,
  },
  time: { fontSize: 11, color: colors.muted, marginTop: 8 },
});
