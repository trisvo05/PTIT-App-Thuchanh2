import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchX } from 'lucide-react-native';
import { colors } from '../theme/colors';

export function EmptyState({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <SearchX size={42} color={colors.muted} strokeWidth={1.5} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 70 },
  text: { fontSize: 14, color: colors.muted, marginTop: 12 },
});
