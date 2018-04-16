import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { Translate } from '../../lib';

export const AdminScreen = ({ handleNavigateTo }) => (
  <SafeAreaView>
    <Button
      onPress={() => handleNavigateTo('AdminCalendar')}
      title={Translate.t('admin.calendar.editCalendar')}
    />
  </SafeAreaView>
);
