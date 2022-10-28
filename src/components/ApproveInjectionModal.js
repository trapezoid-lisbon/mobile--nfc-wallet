import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {useRecoilValue} from 'recoil';

const ApproveInjectionModal = ({setShowInjectionModal, payload}) => {
  useEffect(() => {
    emitterController.on(ON_SESSION_REQUEST, ({params}) => {
      const [data] = params;
      setData(data);
      setIsOpen(true);
    });
  }, []);

  console.log(data, 'what is data?', data?.peerMeta.icons[0]);
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
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      style={styles.modalView}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text
            style={[styles.content, styles.header]}
            tx="APPROVE INJECTION"
          />
          <Text style={styles.content} tx="Halli hallo" />

          <Button
            buttonStyle={styles.btnTwo}
            onPress={connect}
            title="Write Nfc"
          />
          <Button buttonStyle={styles.btnTwo} onPress={reject} title="Deny" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  contentWrapper: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderColor: palette.gray,
    borderWidth: 1,
    padding: 20,
    shadowColor: palette.black2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    fontSize: 14,
    color: palette.black2,
    textAlign: 'justify',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default ApproveInjectionModal;
