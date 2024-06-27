// MenuItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../config/colors';

type MenuItemProps = {
  iconName: string;
  label: string;
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ iconName, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={60} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  icon: {
    marginBottom: 5,
    color: colors.fontColor
  },
  label: {
    fontSize: 34,
    color: colors.fontColor,
  },
});

export default MenuItem;
