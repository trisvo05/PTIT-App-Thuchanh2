import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bell,
  ChevronRight,
  CircleUserRound,
  LogOut,
  Pencil,
  ShieldCheck,
  Wifi,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Avatar } from '../components/Avatar';
import { colors } from '../theme/colors';
import type { MainTabParamList } from '../types';

type Props = BottomTabScreenProps<MainTabParamList, 'Settings'>;
type RowProps = {
  icon: LucideIcon;
  label: string;
  detail: string;
  children?: React.ReactNode;
};

function SettingRow({ icon: Icon, label, detail, children }: RowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Icon size={20} color={colors.primary} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDetail}>{detail}</Text>
      </View>
      {children ?? <ChevronRight size={19} color={colors.muted} />}
    </View>
  );
}

export function SettingsScreen({ navigation }: Props) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [onlineEnabled, setOnlineEnabled] = useState(true);
  const logout = () =>
    navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Login' }] });

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Cài đặt</Text>
      </View>
      <View style={styles.profile}>
        <Avatar uri="https://i.pravatar.cc/150?img=49" online size={72} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Nguyễn Thu Hà</Text>
          <Text style={styles.email}>thuha@example.com</Text>
          <Text style={styles.online}>Đang hoạt động</Text>
        </View>
        <TouchableOpacity
          style={styles.edit}
          accessibilityLabel="Chỉnh sửa hồ sơ"
        >
          <Pencil size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>TÀI KHOẢN</Text>
      <View style={styles.group}>
        <SettingRow
          icon={CircleUserRound}
          label="Thông tin cá nhân"
          detail="Tên, email và ảnh đại diện"
        />
        <View style={styles.divider} />
        <SettingRow
          icon={ShieldCheck}
          label="Quyền riêng tư"
          detail="Mật khẩu và bảo mật"
        />
      </View>

      <Text style={styles.section}>TÙY CHỌN</Text>
      <View style={styles.group}>
        <SettingRow
          icon={Bell}
          label="Thông báo"
          detail="Nhận thông báo tin nhắn"
        >
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#CBD3D1', true: '#8FC5BF' }}
            thumbColor={pushEnabled ? colors.primary : colors.surface}
          />
        </SettingRow>
        <View style={styles.divider} />
        <SettingRow
          icon={Wifi}
          label="Trạng thái trực tuyến"
          detail="Cho phép bạn bè nhìn thấy"
        >
          <Switch
            value={onlineEnabled}
            onValueChange={setOnlineEnabled}
            trackColor={{ false: '#CBD3D1', true: '#8FC5BF' }}
            thumbColor={onlineEnabled ? colors.primary : colors.surface}
          />
        </SettingRow>
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={logout}
        activeOpacity={0.75}
      >
        <LogOut size={19} color={colors.danger} />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
      <Text style={styles.version}>Hola Chat • Phiên bản 1.0.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 18 },
  title: { fontSize: 27, fontWeight: '800', color: colors.text },
  profile: {
    marginHorizontal: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileInfo: { flex: 1, marginLeft: 14 },
  profileName: { fontSize: 18, fontWeight: '800', color: colors.text },
  email: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  online: { fontSize: 11, color: colors.success, marginTop: 7 },
  edit: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  section: {
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: 1.1,
    fontWeight: '700',
    marginHorizontal: 22,
    marginTop: 22,
    marginBottom: 9,
  },
  group: {
    marginHorizontal: 20,
    backgroundColor: colors.surface,
    borderRadius: 11,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingRow: { minHeight: 68, flexDirection: 'row', alignItems: 'center' },
  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: { flex: 1, marginLeft: 12 },
  settingLabel: { fontSize: 14, fontWeight: '700', color: colors.text },
  settingDetail: { fontSize: 11, color: colors.textSecondary, marginTop: 3 },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 50 },
  logout: {
    height: 49,
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 9,
    backgroundColor: colors.dangerSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 14,
    color: colors.danger,
    fontWeight: '700',
    marginLeft: 8,
  },
  version: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.muted,
    marginTop: 13,
  },
});
