import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Bell,
  ContactRound,
  MessageSquareText,
  Settings,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatScreen } from '../screens/ChatScreen';
import { ContactsScreen } from '../screens/ContactsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors } from '../theme/colors';
import type { MainTabParamList, RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({
  icon: Icon,
  color,
  focused,
}: {
  icon: LucideIcon;
  color: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.icon, focused && styles.activeIcon]}>
      <Icon size={20} color={color} strokeWidth={focused ? 2.4 : 2} />
    </View>
  );
}

const MessagesIcon = (props: { color: string; focused: boolean }) => (
  <TabIcon {...props} icon={MessageSquareText} />
);
const ContactsIcon = (props: { color: string; focused: boolean }) => (
  <TabIcon {...props} icon={ContactRound} />
);
const NotificationsIcon = (props: { color: string; focused: boolean }) => (
  <TabIcon {...props} icon={Bell} />
);
const SettingsIcon = (props: { color: string; focused: boolean }) => (
  <TabIcon {...props} icon={Settings} />
);

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Tin nhắn', tabBarIcon: MessagesIcon }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ tabBarLabel: 'Danh bạ', tabBarIcon: ContactsIcon }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: NotificationsIcon,
          tabBarBadge: 2,
          tabBarBadgeStyle: styles.badge,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Cài đặt', tabBarIcon: SettingsIcon }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingTop: 6,
    paddingBottom: 7,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  label: { fontSize: 10, fontWeight: '600' },
  icon: {
    width: 34,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: { backgroundColor: colors.primarySoft },
  badge: {
    fontSize: 9,
    minWidth: 16,
    height: 16,
    lineHeight: 16,
    backgroundColor: colors.accent,
  },
});
