import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChevronLeft, Paperclip, Phone, Send } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar } from '../components/Avatar';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export function ChatScreen({ route, navigation }: Props) {
  const { name, avatar, online } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Chào bạn, hôm nay thế nào?', mine: false, time: '09:35' },
    { id: '2', text: 'Mình ổn, cảm ơn bạn!', mine: true, time: '09:37' },
    {
      id: '3',
      text: 'Cuối tuần mình gặp nhau nhé!',
      mine: false,
      time: '09:42',
    },
  ]);

  const send = () => {
    const text = message.trim();
    if (!text) {
      return;
    }
    setMessages(current => [
      ...current,
      { id: `${Date.now()}`, text, mine: true, time: 'Bây giờ' },
    ]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
          accessibilityLabel="Quay lại"
        >
          <ChevronLeft size={27} color={colors.text} />
        </TouchableOpacity>
        <Avatar uri={avatar} online={online} size={42} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.status, online && styles.online]}>
            {online ? 'Đang hoạt động' : 'Không hoạt động'}
          </Text>
        </View>
        <TouchableOpacity style={styles.phone} accessibilityLabel="Gọi điện">
          <Phone size={19} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.messageLine, item.mine && styles.mineLine]}>
              <View
                style={[
                  styles.bubble,
                  item.mine ? styles.mineBubble : styles.theirBubble,
                ]}
              >
                <Text
                  style={[styles.messageText, item.mine && styles.mineText]}
                >
                  {item.text}
                </Text>
                <Text style={[styles.time, item.mine && styles.mineTime]}>
                  {item.time}
                </Text>
              </View>
            </View>
          )}
        />
        <View style={styles.composer}>
          <TouchableOpacity style={styles.attach} accessibilityLabel="Đính kèm">
            <Paperclip size={20} color={colors.primary} />
          </TouchableOpacity>
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor={colors.muted}
            multiline
          />
          <TouchableOpacity
            style={[styles.send, !message.trim() && styles.sendDisabled]}
            onPress={send}
            accessibilityLabel="Gửi tin nhắn"
          >
            <Send size={18} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    width: 38,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
  },
  headerInfo: { flex: 1, marginLeft: 11 },
  name: { fontSize: 16, fontWeight: '800', color: colors.text },
  status: { fontSize: 11, color: colors.muted, marginTop: 3 },
  online: { color: colors.success },
  phone: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboard: { flex: 1, backgroundColor: colors.background },
  list: { padding: 18, paddingTop: 24 },
  messageLine: { flexDirection: 'row', marginBottom: 12, paddingRight: 50 },
  mineLine: { justifyContent: 'flex-end', paddingRight: 0, paddingLeft: 50 },
  bubble: {
    maxWidth: '100%',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  theirBubble: { backgroundColor: colors.surface, borderBottomLeftRadius: 3 },
  mineBubble: { backgroundColor: colors.primary, borderBottomRightRadius: 3 },
  messageText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  mineText: { color: colors.surface },
  time: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  mineTime: { color: '#C7E4E0' },
  composer: {
    minHeight: 70,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  attach: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    maxHeight: 90,
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: '#EDF1F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 14,
  },
  send: {
    width: 42,
    height: 42,
    borderRadius: 10,
    marginLeft: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { backgroundColor: '#AEBBB8' },
});
