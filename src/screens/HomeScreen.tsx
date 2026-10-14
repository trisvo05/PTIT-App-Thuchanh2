import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/EmptyState';
import { ScreenHeader } from '../components/ScreenHeader';
import { SearchBox } from '../components/SearchBox';
import { conversations } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList, RootStackParamList } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      conversations.filter(item =>
        `${item.name} ${item.message}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <SafeAreaView style={styles.page}>
      <ScreenHeader title="Tin nhắn" subtitle="Các cuộc trò chuyện gần đây" />
      <SearchBox
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm cuộc trò chuyện"
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState text="Không tìm thấy cuộc trò chuyện" />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Chat', item)}
          >
            <Avatar uri={item.avatar} online={item.online} />
            <View style={styles.content}>
              <View style={styles.rowBetween}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.time, item.unread > 0 && styles.activeTime]}
                >
                  {item.time}
                </Text>
              </View>
              <View style={styles.rowBetween}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.preview,
                    item.unread > 0 && styles.unreadPreview,
                  ]}
                >
                  {item.message}
                </Text>
                {item.unread > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  row: {
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: { flex: 1, marginLeft: 13 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '700', color: colors.text, flexShrink: 1 },
  time: { fontSize: 11, color: colors.muted, marginLeft: 10 },
  activeTime: { color: colors.primary, fontWeight: '600' },
  preview: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 7,
    flex: 1,
    marginRight: 10,
  },
  unreadPreview: { color: colors.text, fontWeight: '600' },
  badge: {
    minWidth: 21,
    height: 21,
    borderRadius: 11,
    paddingHorizontal: 6,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: colors.surface },
});
