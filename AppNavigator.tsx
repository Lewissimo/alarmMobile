// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import { useAuth } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';
import CustomHeader from './components/CustomHeader';
import { colors } from './config/colors';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Dashboard" : "Login"}>
        {!user ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Logowanie' }} 
          />
        ) : (
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
            options={({ navigation }) => ({
              header: () => <CustomHeader navigation={navigation} />
            })} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
