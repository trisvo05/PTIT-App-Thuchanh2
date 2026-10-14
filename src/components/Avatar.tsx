import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = { uri: string; online?: boolean; size?: number };

export function Avatar({ uri, online, size = 56 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
      {online !== undefined && (
        <View
          style={[styles.status, online ? styles.online : styles.offline]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.border },
  status: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.background,
  },
  online: { backgroundColor: colors.success },
  offline: { backgroundColor: '#BAC3C1' },
});
