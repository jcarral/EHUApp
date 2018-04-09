import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../config';
import { Translate } from '../lib';

const EMPTY_ITEM = Translate.t('components.emptyList');

const styles = StyleSheet.create({
  emptyList: {
    backgroundColor: colors.white,
    padding: 10,
    flex: 1,
  },
  emptyText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export const EmptyList = ({ title = EMPTY_ITEM }) => (
  <View style={[styles.emptyList]}>
    <Text style={[styles.emptyText]}> { title } </Text>
  </View>
);
