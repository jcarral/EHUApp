import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { Translate, TextFormat } from '../../lib';
import languages from '../language-settings';
import { form, safearea } from '../../assets';
import { colors } from '../../config';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.black,
  },
  list: {
    flex: 1,
  },
});

export const LanguagesScreen = ({ handleChangeLocale, locale }) => (
  <SafeAreaView style={[safearea.container, safearea.whitesafe]}>
    <View style={[styles.headerContainer]}>
      <Icon type='font-awesome' name='language' iconStyle={{ fontSize: 60 }} />
      <Text style={[styles.headerTitle]}> {Translate.t('settings.languageTitle')} </Text>
    </View>
    <List style={[styles.list]}>
      <FlatList
        data={languages}
        renderItem={({ item, index }) => (
          <ListItem
            title={`${TextFormat.emojify(item.emojiCode)} ${item.name}`}
            onPressRightIcon={() => handleChangeLocale(item.code)}
            key={index}
          />)
        }
      />
    </List>
  </SafeAreaView>
);
