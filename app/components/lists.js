import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

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
  listHeader: {
    backgroundColor: colors.lightGrey,
    padding: 15,
  },
  listHeaderText: {
    fontWeight: '700',
  },
  listRow: {
    backgroundColor: colors.white,
    padding: 15,
  },
});

export const EmptyList = ({ title = EMPTY_ITEM }) => (
  <View style={[styles.emptyList]}>
    <Text style={[styles.emptyText]}> { title } </Text>
  </View>
);

export const SectionListHeader = ({ children, containerStyle = [], textStyle = [] }) => (
  <View style={[styles.listHeader].concat(containerStyle)}>
    <Text style={[styles.listHeaderText].concat(textStyle)}> { children.toUpperCase() } </Text>
  </View>
);

export const ListRow = ({ children, containerStyle = [], onPress }) => {
  if (onPress) {
    return (
      <TouchableHighlight
        style={containerStyle.concat([styles.listRow])}
        onPress={onPress}
      >
        <Text> {(typeof children === typeof {}) ? '' : children } </Text>
      </TouchableHighlight>
    );
  }
  return (
    <View style={containerStyle.concat([styles.listRow])}>
      <Text> {(typeof children === typeof {}) ? '' : children } </Text>
    </View>
  );
};
