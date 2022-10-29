import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from 'react-native';
//COMPONENT NOT CURRENTLY USED
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function QrScanner({showQRScanner, setShowQRScanner}) {
  return (
    <View style={styles.container}>
      {showQRScanner ? (
        <View>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={'Interact with dApp'}
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Pressable onPress={() => setShowQRScanner(true)}>
            <Text>QR SCANNER!!</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#FF57A8',
    position: 'absolute',

    zIndex: 100,
  },
  reviewContent: {
    position: 'absolute',
    bottom: 0,
    width: 300,
  },
  drawerContainer: {paddingHorizontal: 15, paddingVertical: 20},

  text: {
    fontFamily: 'Anek Kannada',
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  drawerTitle: {
    fontSize: 30,
    lineHeight: 40,
    color: '#FF57A8',
    marginTop: 20,
  },

  subheadingText: {
    color: '#FF57A8',
    fontSize: 15,
    marginTop: 30,
  },

  subheadingInfo: {
    color: '#FF57A8',
    fontSize: 15,
    marginTop: 5,
  },
});
