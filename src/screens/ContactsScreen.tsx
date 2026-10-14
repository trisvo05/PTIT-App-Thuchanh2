import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/EmptyState';
import { ScreenHeader } from '../components/ScreenHeader';
import { SearchBox } from '../components/SearchBox';
import { contacts } from '../data/mockData';
import { colors } from '../theme/colors';
import type { MainTabParamList, RootStackParamList } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Contacts'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function ContactsScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      contacts.filter(item =>
        item.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <SafeAreaView style={styles.page}>
      <ScreenHeader
        title="Danh bạ"
        subtitle={`${contacts.length} người liên hệ`}
      />
      <SearchBox
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm trong danh bạ"
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState text="Không tìm thấy người liên hệ" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Chat', item)}
          >
            <Avatar uri={item.avatar} online={item.online} size={52} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={[styles.status, item.online && styles.online]}>
                {item.lastSeen}
              </Text>
            </View>
            <View style={styles.action}>
              <MessageCircle size={19} color={colors.primary} />
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
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  info: { flex: 1, marginLeft: 13 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  status: { fontSize: 12, color: colors.muted, marginTop: 5 },
  online: { color: colors.success },
  action: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
