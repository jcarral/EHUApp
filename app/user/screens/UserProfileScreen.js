import React from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Translate } from '../../lib';

export const UserProfileScreen = ({user, navigateTo}) => (
  <SafeAreaView>
    <View> 
      <Icon onPress={ () => navigateTo('Languages') } name='settings'/>
    </View>
  </SafeAreaView>
);
