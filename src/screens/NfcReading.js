import React, {useState} from 'react';
import {Text} from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import WalletConnectController from '../controllers/walletConnectController';

import {DataContext} from '../services/DataContext';
import {Button} from 'react-native-elements';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import Drawer from '../components/drawer';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function NfcReading({navigation, screenProps}) {
  const {someValue} = React.useContext(DataContext);
  const [data, setData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const onSuccess = e => {
    console.log(e, 'SUCCESS READING QR');
    new WalletConnectController(e.data);
    navigation.navigate('ApproveInjectionScreen', {uri: e.data});
    setShowQRScanner(false);
  };

  console.log(showDrawer, 'SHOW DRAWER');
  // Pre-step, call this before any NFC operations
  NfcManager.start();

  async function readNdef() {
    setShowDrawer(true);
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag, 'PAYLOAD:', tag.ndefMessage[0].payload);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  const writeNdef = async (type, value) => {
    let result = false;

    console.log('TYPE, VALUE', type, value);
    try {
      // STEP 1
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);

      if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
        Alert.alert('Successfully written to NFC!');
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      // STEP 4
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {showQRScanner ? (
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
              <Text style={styles.centerText}>
                Go to{' '}
                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
                on your computer and scan the QR code.
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
        ) : (
          <View style={styles.container}>
            <Pressable onPress={() => setShowQRScanner(true)}>
              <Text color={'black'}>QR SCANNER!!</Text>
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.textSmall}>scan nfc</Text>
      </View>
      <Button
        buttonStyle={styles.btn}
        onPress={() => readNdef()}
        title="Read Nfc"
      />
      <Button
        buttonStyle={styles.btnTwo}
        onPress={() => writeNdef()}
        title="Write Nfc"
      />
      {showDrawer ? <Drawer /> : null}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 50,
  },
  textSmall: {
    fontFamily: 'Anek Kannada',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 66,
    lineHeight: 66,
    textTransform: 'lowercase',
    /* Greys/White */
    color: '#FF57A8',
  },

  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 71,
    marginTop: 270,
    backgroundColor: '#FF57A8',
    borderRadius: 54,
  },

  btnTwo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 71,
    marginTop: 30,
    backgroundColor: '#FF57A8',
    borderRadius: 54,
  },

  importSeedPhrase: {
    fontFamily: 'Anek Kannada',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 66,
    textTransform: 'lowercase',
    /* Greys/White */
    color: '#FF57A8',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
