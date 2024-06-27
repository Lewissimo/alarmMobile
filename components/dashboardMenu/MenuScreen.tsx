// MenuScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { InnerStackParamList } from './MainDashNavigator';
import { colors } from '../../config/colors';

type MenuScreenNavigationProp = StackNavigationProp<InnerStackParamList, 'menu'>;

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();

  const handlePress = (label: keyof InnerStackParamList) => {
    navigation.navigate(label);
  };

  return (
    <View style={styles.container}>
      <MenuItem iconName="devices" label="Urządzenia" onPress={() => handlePress('devices')} />
      <MenuItem iconName="settings" label="Ustawienia" onPress={() => handlePress('setting')} />
      <MenuItem iconName="info" label="Informacje" onPress={() => handlePress('info')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.secondaryBgColor,
  },
});

export default MenuScreen;
