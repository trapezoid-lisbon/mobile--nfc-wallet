import React, {useState, useEffect} from 'react';
import {Button, Text} from 'react-native-elements';

import {FlatList, StyleSheet, TextInput, View} from 'react-native';

import {DataContext} from '../services/DataContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function SeedPhraseImport({navigation, screenProps}) {
  const {someValue} = React.useContext(DataContext);
  const [data, setData] = useState([]);

  const [seedPhraseLength, setPhraseLength] = useState(12);
  const [chosenSeedWords, setChosenSeedWords] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  const onContinue = () => {
    navigation.navigate('PasswordCreationScreen', {
      mnemonic: chosenSeedWords.join(' ').trim(),
      imported: true,
    });
  };
  const renderSeedWord = ({item, index}: {item: any, index: number}) => {
    const opacity = chosenSeedWords[index].length ? 1 : 0.4;
    return (
      <View width={'27%'}>
        <Text style={styles.numberLabel}>{index + 1}</Text>
        <TextInput
          style={styles.seedPhraseInputs}
          autoCorrect={false}
          keyboardType="ascii-capable"
          autoCapitalize={'none'}
          onChangeText={value => {
            chosenSeedWords[index] = value;
            setChosenSeedWords([...chosenSeedWords]);
          }}
          returnKeyType="done"
          cursorColor={'pink'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={chosenSeedWords}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={renderSeedWord}
          numColumns={3}
        />
      </SafeAreaView>
      <Button
        buttonStyle={styles.btn}
        title="Next"
        onPress={() => navigation.navigate('PasswordCreationScreen')}
      />
      <Button
        buttonStyle={styles.btnCancel}
        title="Cancel"
        onPress={() => navigation.goBack()}
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
  numberLabel: {
    fontFamily: 'Anek Kannada',
    fontSize: 12,
    color: 'darkGrey',
    fontWeight: '600',
  },

  safeAreaContainer: {},
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 230,
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
  flatList: {
    margin: 20,
  },
  columnWrapperStyle: {
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  seedPhrase: {
    backgroundColor: '#fff',
  },

  seedPhraseInputs: {
    paddingTop: 10,
    color: 'pink',
    borderBottomColor: 'pink',
    borderBottomWidth: 1,
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'Anek Kannada',
  },
});
