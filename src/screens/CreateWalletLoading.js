import React, {useState, useEffect} from 'react';
import {Text} from 'react-native-elements';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {DataContext} from '../services/DataContext';
import {Button} from 'react-native-elements';
//import {getAsset, getChain} from '@liquality/cryptoassets';
//import {setupWallet} from '@liquality/wallet-core';
//import defaultOptions from '@liquality/wallet-core/dist/src/walletOptions/defaultOptions';

/* const wallet = setupWallet({
  ...defaultOptions,
}); */
export default function CreateWalletLoading({navigation, screenProps}) {
  const {someValue} = React.useContext(DataContext);
  const [data, setData] = useState([]);

  const createWallet = async (password, mnemonic) => {
    await initWallet();
    await wallet.dispatch.createWallet({
      key: password,
      mnemonic: mnemonic,
      imported: true,
    });
    //storageManager.write('wallet', wallet.state)
    return wallet.state;
  };

  useEffect(() => {
    //createWallet(route.params.password || '', route.params.mnemonic || '').then(

    createWallet(
      'hej' || '',
      'leave satisfy swear sphere first brush hub magnet liar south toward mule' ||
        '',
    ).then(wallet => {
      const {activeWalletId} = wallet;
      console.log(activeWalletId, 'WALLET!!!', wallet, 'AAAAL ASSSETS');
      let supportedNetWorks = ['mainnet', 'testnet'];

      for (let network of supportedNetWorks) {
        const accounts = wallet?.accounts?.[activeWalletId]?.[network];
        if (accounts) {
          const accountsIds = [];
          accounts.map(account => {
            const nativeAsset = getChain(network, account.chain).nativeAsset;
            accountsIds.push({
              id: account.id,
              name: nativeAsset[0].code,
            });

            const newAccount = {
              id: account.id,
              chain: account.chain,
              name: account.name,
              code: nativeAsset[0].code,
              address: account.addresses[0], //TODO why pick only the first address
              color: account.color,
              assets: {},
              balance: 0,
            };

            for (const asset of account.assets) {
              newAccount.assets[asset] = {
                id: asset,
                name: getAsset(network, asset).name,
                code: asset,
                chain: account.chain,
                color: account.color,
                balance: 0,
                assets: {},
              };
              //addAssetBalance(account.id, asset)
            }

            //addAccount(account.id, newAccount)
          });
        } else {
          Alert.alert('Failed to import wallet!');
          return;
        }
        navigation.navigate('CongratsScreen');
      }
    });
  });
  return <ActivityIndicator size="large" color="#00ff00" />;
}
