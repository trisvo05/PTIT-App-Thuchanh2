import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { colors } from '../theme/colors';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
};

export function SearchBox({ value, onChangeText, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Search size={19} color={colors.textSecondary} strokeWidth={2} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          hitSlop={10}
          accessibilityLabel="Xóa tìm kiếm"
        >
          <X size={18} color={colors.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: '#E9EEEC',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
    paddingVertical: 0,
  },
});
