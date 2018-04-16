import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { colors } from '../../config';

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  btnSign: {
    backgroundColor: colors.red,
    margin: 5,
  },
});

export const HomepageScreen = () => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.container} />
  </SafeAreaView>
);
