import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Text, List, ListItem, Icon } from 'react-native-elements';
import { safearea } from '../../assets';
import { colors } from '../../config';
import { Translate } from '../../lib';

const styles = StyleSheet.create({

});

const parseList = (dates = {}) =>
  Object.keys(dates)
    .map(type => Object.keys(dates[type]).map(id => ({
      ...dates[type][id],
      type,
      id,
    })))
    .reduce((prev, curr) => prev.concat(curr))
    .sort((a, b) => ((a.dateString >= b.dateString) ? 1 : -1));

const setTitle = (type, name = '', number = 0) => {
  if (type === 'holidays') return (name.length > 0) ? name : Translate.t('admin.calendar.defaultHoliday');
  else if (type === 'weekStart') return `${Translate.t('admin.calendar.weekStartListTitle')} #${number}`;
  return '';
};

export const AdminDatesListScreen = ({ dates = {}, handleDeleteItem }) => (
  <SafeAreaView style={[safearea.container]}>
    <ScrollView>
      <List containerStyle={{ marginBottom: 20 }} >
        {
          parseList(dates).map((item, index) =>
            (<ListItem
              key={item.id}
              title={setTitle(item.type, item.name, item.weekStart)}
              subtitle={item.dateString}
              rightIcon={{ name: 'trash', type: 'font-awesome', color: colors.red }}
              onPressRightIcon={() => handleDeleteItem(item.type, item.id)}
            />))
        }
      </List>
    </ScrollView>
  </SafeAreaView>
);

