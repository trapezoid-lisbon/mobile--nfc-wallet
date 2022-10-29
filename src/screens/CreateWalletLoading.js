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
    //createWallet(route.params.password || '', route.params.mnemonic || '').then(
    /*     wallet.dispatch.createWallet(
      ['hej'] || '',
      'leave satisfy swear sphere first brush hub magnet liar south toward mule' ||
        '',
    ); */
    wallet.dispatch
      .createWallet({
        key: 'hej',
        mnemonic:
          'leave satisfy swear sphere first brush hub magnet liar south toward mule',
        imported: true,
      })
      .then(wallet => {
        const {activeWalletId} = wallet;
        console.log(activeWalletId, 'WA LLET!!!', wallet, 'AAAAL ASSSETS');
        let supportedNetWorks = ['mainnet', 'testnet'];
        console.log(
          wallet.state,
          'WALLET STATE',
        )(async () => {
          await wallet.dispatch.unlockWallet({key: 'hej'});
          console.log(wallet.state, 'WALLEdT STATE'); // State will include default accounts
        })();

        /* for (let network of supportedNetWorks) {
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
            navigation.navigate('EntryScreen');
            return;
          }
          navigation.navigate('CongratsScreen');
        } */
      });
    /*  (async () => {
      await wallet.dispatch.createWallet({
        key: 'satoshi',
        mnemonic:
          'never gonna give you up never gonna let you down never gonna',
        imported: true,
      });
      await wallet.dispatch.unlockWallet({key: 'satoshi'});
      await wallet.dispatch.changeActiveNetwork({network: 'mainnet'});
      console.log(wallet.state); // State will include default accounts
    })(); */
  });
  return <ActivityIndicator size="large" color="#00ff00" />;
}
