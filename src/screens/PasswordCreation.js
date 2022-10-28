import React, {useState} from 'react';
import {Button, Text} from 'react-native-elements';

import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {DataContext} from '../services/DataContext';

export default function PasswordCreation({navigation, route, screenProps}) {
  const {someValue} = React.useContext(DataContext);
  const [data, setData] = useState([]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const arePasswordsValid = () => {
    const isError =
      !!confirmPassword && !!password && password === confirmPassword;
    if (!isError) {
      setError("Passwords don't match");
    }
    console.log(isError, 'ISERR?');
    return isError;
  };
  console.log(error, 'ISERR?');
  const onPress = () => {
    Keyboard.dismiss();
    if (arePasswordsValid()) {
      navigation.navigate('CreateWalletLoadingScreen', {
        ...route.params,
        password: password,
      });
    }
  };

  return (
    <View padding={30} flex={1} backgroundColor={'white'}>
      <KeyboardAvoidingView>
        <View marginTop={30}>
          <Text style={styles.headerText}>Create Password</Text>
        </View>
        <View marginTop={10}>
          <View>
            <Text style={styles.mainInputLabel}>Password</Text>
            <SafeAreaView>
              <TextInput
                style={styles.passwordInputs}
                autoCorrect={false}
                keyboardType="ascii-capable"
                autoCapitalize={'none'}
                onChangeText={value => {
                  setPassword(value);
                }}
                returnKeyType="done"
                cursorColor={'pink'}
              />
            </SafeAreaView>
          </View>
          <View marginTop={60}>
            <Text style={styles.mainInputLabel}>Confirm Password</Text>

            <TextInput
              style={styles.passwordInputs}
              autoCorrect={false}
              keyboardType="ascii-capable"
              autoCapitalize={'none'}
              onChangeText={value => {
                setConfirmPassword(value);
              }}
              returnKeyType="done"
              cursorColor={'pink'}
            />

            {error.length ? (
              <View
                marginTop={10}
                borderRadius={5}
                padding={10}
                backgroundColor={'white'}>
                <Text>ERROR password does not match</Text>
              </View>
            ) : null}
          </View>
          <TextInput
            style={styles.seedPhraseInputs}
            autoCorrect={false}
            keyboardType="ascii-capable"
            autoCapitalize={'none'}
            onChangeText={value => {
              setConfirmPassword(value);
            }}
            returnKeyType="done"
            cursorColor={'pink'}
            onSubmitEditing={onPress}
          />
        </View>
        <Button buttonStyle={styles.btn} title="Next" onPress={onPress} />
        <Button
          buttonStyle={styles.btnCancel}
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FF57A8',
    borderRadius: 54,
  },

  btnCancel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ff9aca',
    borderRadius: 54,
  },
  headerText: {
    fontFamily: 'Anek Kannada',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 46,
    lineHeight: 56,
    textTransform: 'lowercase',
    /* Greys/White */
    color: '#FF57A8',
    marginBottom: 50,
  },
  passwordInputs: {
    paddingTop: 10,
    color: '#FF57A8',
    borderBottomColor: '#FF57A8',
    borderBottomWidth: 1,
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'Anek Kannada',
  },
  mainInputLabel: {
    fontFamily: 'Anek Kannada',
    fontWeight: '500',
    fontSize: 15,

    color: 'grey',
  },
});
