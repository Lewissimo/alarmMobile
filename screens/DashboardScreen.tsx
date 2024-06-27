// screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNavigator';
import NotificationBox from '../components/notificationsList/ListScreen';
import SwiperComponent from '../components/Swiper';
import { colors } from '../config/colors';

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

function DashboardScreen({ navigation }: Props) {

  return (
    <View style={styles.container}>
        <SwiperComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBgColor,
    flex: 1,
    width: '100%'
  },
});

export default DashboardScreen;
