import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SquarePen } from 'lucide-react-native';
import { colors } from '../theme/colors';

type Props = { title: string; subtitle?: string; showAction?: boolean };

export function ScreenHeader({ title, subtitle, showAction = true }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {showAction && (
        <TouchableOpacity style={styles.action} accessibilityLabel="Tạo mới">
          <SquarePen size={21} color={colors.surface} strokeWidth={2} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  action: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
