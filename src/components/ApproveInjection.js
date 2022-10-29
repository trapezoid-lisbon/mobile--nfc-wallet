import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {emitterController} from '../controllers/emitterController';
import {INJECTION_REQUESTS} from '../controllers/constants';
const {ON_SESSION_REQUEST, OFF_SESSION_REQUEST} = INJECTION_REQUESTS;

const ApproveInjectionScreen = ({
  navigation,
  setShowInjectionModal,
  payload,
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    emitterController.on(ON_SESSION_REQUEST, ({params}) => {
      console.log(params, 'EVENT EMITTED PARAMS IN INJECTION MODAL');
      const [data] = params;
      setData(data);
      setIsOpen(true);
    });
  }, []);

  console.log(data, 'what is data?');
  const connect = () => {
    //TODO: make the wallet address come from getAddressByChainId(data.chainId) instead
    emitterController.emit(OFF_SESSION_REQUEST, [
      '0xD8CeBecb8a26864812E73A35B59f318890a76966',
    ]);
    navigation.navigate('EntryScreen');
  };

  const reject = () => {
    emitterController.emit(OFF_SESSION_REQUEST, null);
    navigation.navigate('EntryScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textSmall}>Approve Wallet Connect</Text>
      </View>
      <View>
        {data ? (
          <Image
            style={styles.imgLogo}
            source={{uri: data.peerMeta.icons[0]}}
          />
        ) : null}
      </View>
      <View padding={30} paddingTop={130}>
        <Button buttonStyle={styles.btn} onPress={connect} title="Connect" />
      </View>
      <View padding={30}>
        <Button buttonStyle={styles.btn} onPress={reject} title="Deny" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  imgLogo: {width: 65, height: 65},

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

export default ApproveInjectionScreen;
