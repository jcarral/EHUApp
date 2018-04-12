import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    flex: 1,
  },
});

export const LoadingScreen = () => (
  <View style={[styles.container]}>
    <ActivityIndicator size="large" color={colors.red} />
  </View>
);
