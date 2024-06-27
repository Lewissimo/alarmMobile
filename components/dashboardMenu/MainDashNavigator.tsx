import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import MenuScreen from './MenuScreen';
import ListScreen from '../devicesEditList/ListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../config/colors';
import InfoComponent from './InfoComponent';
import Settings from '../Settings';

export type InnerStackParamList = {
    menu: undefined;
    devices: undefined;
    setting: undefined;
    info: undefined;
};

const InnerStack = createStackNavigator<InnerStackParamList>();

function MainDashNavigator() {
  return (
      <NavigationContainer independent={true}>
        <InnerStack.Navigator initialRouteName="menu"
        
        screenOptions={{
          headerTintColor: colors.fontColor,
          headerStyle: {
            backgroundColor: colors.secondaryBgColor
          }
        }}
        >
          <InnerStack.Screen name="menu" options={{headerShown: false}} component={MenuScreen} />
          <InnerStack.Screen name="devices" component={ListScreen} options={{ title: 'Urządzenia', headerStyle: {backgroundColor: colors.secondaryBgColor }}} />
          <InnerStack.Screen name="setting" component={Settings} options={{ title: 'Ustawienia', headerStyle: {backgroundColor: colors.secondaryBgColor }}} />
          <InnerStack.Screen name="info" component={InfoComponent} options={{ title: 'Info', headerStyle: {backgroundColor: colors.secondaryBgColor }}} />
        </InnerStack.Navigator>
      </NavigationContainer>
  );
}

export default MainDashNavigator;
