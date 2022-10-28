import React, {useState} from 'react';
import {Text} from 'react-native-elements';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {DataContext} from '../services/DataContext';
import {Button} from 'react-native-elements';
export default function Entry({navigation, screenProps}) {
  const {someValue} = React.useContext(DataContext);
  const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.textSmall}>trapezoid</Text>

      <View style={styles.headerText}>
        <Text style={styles.textBig}>nfc crypto wallet</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('NfcReadingScreen')}>
        <Text style={styles.importSeedPhrase}>TEST NFC READING</Text>
      </Pressable>
      <Button
        buttonStyle={styles.btn}
        onPress={() => Alert.alert('Feature not implemented yet!')}
        title="Create a New Wallet"
      />
      <Pressable onPress={() => navigation.navigate('SeedPhraseImportScreen')}>
        <Text style={styles.importSeedPhrase}>
          Import Wallet with Seed Phrase
        </Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    marginTop: 50,
  },
  textBig: {
    fontFamily: 'Anek Kannada',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 66,
    lineHeight: 66,
    textTransform: 'lowercase',
    /* Greys/White */
    color: '#FF57A8',
  },
  textSmall: {
    fontFamily: 'Anek Kannada',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 26,
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
    marginTop: 170,
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
