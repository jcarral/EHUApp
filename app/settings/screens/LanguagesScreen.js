import React from 'react';
import { SafeAreaView, View, Text, FlatList, } from 'react-native';
import { List, ListItem, } from 'react-native-elements';
import { Translate, TextFormat, } from '../../lib';
import languages from '../language-settings';

export const LanguagesScreen = ({handleChangeLocale, locale}) => (
  <SafeAreaView>
    <View>
      <Text> { Translate.t('settings.languageTitle') } </Text>
    </View>
    <List>
      <FlatList 
        data={languages} 
        renderItem={({ item, index }) => (
          <ListItem 
            title={ `${TextFormat.emojify(item.emojiCode)} ${item.name}` }
            onPressRightIcon={ () => handleChangeLocale(item.code) }
          />)
        } 
        />  
    </List>
  </SafeAreaView>
);
