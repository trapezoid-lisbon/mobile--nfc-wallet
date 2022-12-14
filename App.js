'use strict';
import React from 'react';
import {Text} from 'react-native';
import {DataContext} from './src/services/DataContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Entry from './src/screens/Entry';
import PasswordCreation from './src/screens/PasswordCreation';
import SeedPhraseImport from './src/screens/SeedPhraseImport';
import CreateWalletLoading from './src/screens/CreateWalletLoading';
import Congrats from './src/screens/CongratsScreen';
import NfcReading from './src/screens/NfcReading';
import ApproveInjectionScreen from './src/components/ApproveInjection';
import {setupWallet} from '@liquality/wallet-core';
import defaultOptions from '@liquality/wallet-core/dist/src/walletOptions/defaultOptions';
import Settings from './src/screens/Settings';

const wallet = setupWallet({
  ...defaultOptions,
});
const Tab = createBottomTabNavigator();

const MainStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="HomeScreen" component={Home} />
      <MainStack.Screen name="SettingsScreen" component={Settings} />
      <MainStack.Screen name="NfcReadingScreen" component={NfcReading} />
    </MainStack.Navigator>
  );
}

const OnboardingStack = createNativeStackNavigator();
function OnboardingStackScreen() {
  return (
    <OnboardingStack.Navigator initialRouteName="EntryScreen">
      <OnboardingStack.Screen name="EntryScreen" component={Entry} />
      <OnboardingStack.Screen
        name="PasswordCreationScreen"
        component={PasswordCreation}
      />
      <OnboardingStack.Screen
        name="SeedPhraseImportScreen"
        component={SeedPhraseImport}
      />
      <OnboardingStack.Screen
        name="CreateWalletLoadingScreen"
        component={CreateWalletLoading}
      />
      <OnboardingStack.Screen
        name="ApproveInjectionScreen"
        component={ApproveInjectionScreen}
      />
      <OnboardingStack.Screen name="CongratsScreen" component={Congrats} />
    </OnboardingStack.Navigator>
  );
}

console.log(wallet.state.activeWalletId, 'wats wallt state?');
const App: () => Node = () => {
  return (
    <DataContext.Provider
      value={{
        someValue: 'hej',
        someValueNrTwo: 'hallo',
      }}>
      <NavigationContainer>
        {wallet.state.activeWalletId ? (
          <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
              style: {backgroundColor: '#2a5416'},
              activeTintColor: '#f0edf6',
            }}>
            <Tab.Screen
              name="Home"
              options={{
                headerShown: false,
                tabBarLabel: 'Hem',
                tabBarIcon: ({color}) => <Text>HOME</Text>,
              }}
              component={HomeStackScreen}
            />
            <Tab.Screen
              name="SettingsScreen"
              options={{
                headerShown: false,

                tabBarLabel: 'Info',
                tabBarIcon: ({color}) => <Text>SETTINGS</Text>,
              }}
              component={Settings}
            />
          </Tab.Navigator>
        ) : (
          <OnboardingStackScreen />
        )}
      </NavigationContainer>
    </DataContext.Provider>
  );
};

export default App;
