import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from 'react-native';

export default function Drawer({navigation, screenProps}) {
  const renderSwapReviewContent = () => {
    return (
      <View style={styles.drawerContainer}>
        <Text style={(styles.text, styles.drawerTitle)}>TITLE</Text>
        <Text style={(styles.text, styles.subheadingText)}>
          TODO: Add Swap review content here
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.reviewContent}>
        <View marginTop={'xl'} alignItems="flex-end" padding={'screenPadding'}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setShowDrawer(false);
            }}></TouchableOpacity>
        </View>
        <View
          flex={1}
          backgroundColor="mainBackground"
          paddingHorizontal={'screenPadding'}
          paddingBottom={'xxl'}>
          {renderSwapReviewContent()}
        </View>
      </ScrollView>
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
