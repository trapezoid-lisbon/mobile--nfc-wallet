import React, {useState} from 'react';
import {Text} from 'react-native-elements';

import {StyleSheet, View} from 'react-native';

import {DataContext} from '../services/DataContext';

export default function Home({navigation, screenProps}) {
  const {someValue} = React.useContext(DataContext);
  const [data, setData] = useState([]);

  return (
    <View>
      <Text>HOME SCREEN</Text>
    </View>
  );
}

export const styles = StyleSheet.create({});
