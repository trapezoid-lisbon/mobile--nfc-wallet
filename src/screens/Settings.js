import React, {useState} from 'react';
import {Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {DataContext} from '../services/DataContext';
import {Button} from 'react-native-elements';

export default function Settings({navigation, screenProps}) {
  const {someValue} = React.useContext(DataContext);
  const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textSmall}>Settings Scren</Text>
      </View>
      <Button
        buttonStyle={styles.btn}
        onPress={() => navigation.navigate('HomeScreen')}
        title="Go to Your Wallet"
      />
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
