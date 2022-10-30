import React, {useState, useEffect} from 'react';
import {Text} from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {DataContext} from '../services/DataContext';
import {Button} from 'react-native-elements';
import {getAsset, getChain} from '@liquality/cryptoassets';
import {setupWallet} from '@liquality/wallet-core';
import defaultOptions from '@liquality/wallet-core/dist/src/walletOptions/defaultOptions';

const wallet = setupWallet({
  ...defaultOptions,
});
export default function CreateWalletLoading({navigation, screenProps}) {
  const {someValue} = React.useContext(DataContext);
  const [data, setData] = useState([]);

  const createWallet = async (password, mnemonic) => {
    await wallet.dispatch.createWallet({
      key: password,
      mnemonic: mnemonic,
      imported: true,
    });
    //storageManager.write('wallet', wallet.state)
    return wallet.state;
  };

  useEffect(() => {
    try {
      (async () => {
        await wallet.dispatch.createWallet({
          key: 'satoshi',
          mnemonic:
            'leave satisfy swear sphere first brush hub magnet liar south toward mule',
          imported: true,
        });
        await wallet.dispatch.unlockWallet({key: 'satoshi'});
        await wallet.dispatch.changeActiveNetwork({network: 'mainnet'});
        console.log(wallet.state, 'WALLETSTATE'); // State will include default accounts
        let supportedNetWorks = ['mainnet', 'testnet'];

        for (let network of supportedNetWorks) {
          const accounts = wallet?.accounts?.[activeWalletId]?.[network];

          console.log(accounts, 'ACCOUNTS?');
          if (wallet.state) {
          } else {
            Alert.alert('Failed to import wallet!');
            navigation.navigate('EntryScreen');
            return;
          }
          navigation.navigate('CongratsScreen');
        }
      })();
    } catch (error) {
      console.error(error);
      Alert.alert('Could not import wallet!');
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
  });

  return <ActivityIndicator size="large" color="#00ff00" />;
}
