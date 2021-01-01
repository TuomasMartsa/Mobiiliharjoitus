import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Warnings from './app/screens/Warnings';
import Logbook from './app/screens/Logbook';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './app/screens/MapScreen';
import MapScreen2 from './app/screens/MapScreen2';
import LogScreen2 from './app/screens/LogScreen2';
import AboutScreen from './app/screens/AboutScreen';


export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  function LogTabs() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Lokikirja" component={LogScreen2} options={{  headerStyle: {backgroundColor: '#add8e6'} }}/>
        <Stack.Screen name="Kirjoita" component={Logbook} options={{  headerStyle: {backgroundColor: '#add8e6'} }}/>
        <Stack.Screen name="Lokikartta" component={MapScreen} />
      </Stack.Navigator>
    );
  }

  function WarningsTabs() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Merivaroitukset" component={Warnings} options={{ title: 'Voimassa olevat merivaroitukset', headerStyle: {backgroundColor: '#add8e6'} }} />
        <Stack.Screen name="Kartta" component={MapScreen2} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Koti') {
                iconName =  'ios-home'
                 
              } else if (route.name === 'Lokikirja') {
                iconName = focused ? 'ios-book' : 'md-book';
              } else if (route.name === 'Merivaroitukset') {
                iconName = focused ? 'ios-warning' : 'md-warning';
              } else if (route.name === 'Tietoja') {
                iconName = focused ? 'ios-help-circle' : 'ios-help-circle-outline';  
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#c400c4',
            inactiveTintColor: '#3b9fc1',
            style: {backgroundColor: '#add8e6'}
          }}
      >
        <Tab.Screen name="Koti" component={WelcomeScreen} options={{tabBarVisible: 'false'}}/>
        <Tab.Screen name="Lokikirja" component={LogTabs} />
        <Tab.Screen name="Merivaroitukset" component={WarningsTabs} />
        <Tab.Screen name="Tietoja" component={AboutScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    
  );
  
}


