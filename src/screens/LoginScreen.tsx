import React, { useState } from 'react';
import {
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
import {
  Eye,
  EyeOff,
  LockKeyhole,
  MessageCircle,
  UserRound,
} from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState('');

  const login = () => {
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }
    setError('');
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        <View style={styles.logo}>
          <MessageCircle
            size={34}
            color={colors.surface}
            fill={colors.surface}
          />
        </View>
        <Text style={styles.appName}>Hola Chat</Text>
        <Text style={styles.subtitle}>
          Trò chuyện cùng những người bạn quan tâm
        </Text>

        <View style={styles.form}>
          <Text style={styles.heading}>Đăng nhập</Text>
          <Text style={styles.label}>Tài khoản</Text>
          <View
            style={[
              styles.inputRow,
              error && !username.trim() ? styles.inputError : null,
            ]}
          >
            <UserRound size={19} color={colors.textSecondary} />
            <TextInput
              value={username}
              onChangeText={value => {
                setUsername(value);
                setError('');
              }}
              placeholder="Nhập tài khoản"
              placeholderTextColor={colors.muted}
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>Mật khẩu</Text>
          <View
            style={[
              styles.inputRow,
              error && !password.trim() ? styles.inputError : null,
            ]}
          >
            <LockKeyhole size={19} color={colors.textSecondary} />
            <TextInput
              value={password}
              onChangeText={value => {
                setPassword(value);
                setError('');
              }}
              placeholder="Nhập mật khẩu"
              placeholderTextColor={colors.muted}
              secureTextEntry={secure}
              style={styles.input}
              onSubmitEditing={login}
            />
            <TouchableOpacity
              onPress={() => setSecure(value => !value)}
              hitSlop={8}
              accessibilityLabel="Ẩn hoặc hiện mật khẩu"
            >
              {secure ? (
                <Eye size={19} color={colors.muted} />
              ) : (
                <EyeOff size={19} color={colors.muted} />
              )}
            </TouchableOpacity>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={login}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>Dùng tài khoản bất kỳ để xem bản demo</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  logo: {
    width: 62,
    height: 62,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  appName: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginTop: 14,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 28,
  },
  form: {
    backgroundColor: colors.surface,
    padding: 22,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heading: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputRow: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginBottom: 16,
    backgroundColor: '#FAFBFA',
  },
  inputError: { borderColor: colors.danger, backgroundColor: '#FFF8F7' },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    marginLeft: 10,
    paddingVertical: 0,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -6,
    marginBottom: 13,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  buttonText: { fontSize: 15, fontWeight: '700', color: colors.surface },
  hint: {
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 13,
  },
});
