import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-material-dropdown';
import { Translate } from '../../lib';

export const AdminCalendarScreen = ({ handleAddDate, listOfCalendars }) => (
  <SafeAreaView>
    <Header />
    <Calendar
      onDayPress={day => handleAddDate(day)}
      onDayLongPress={(day) => { console.log('selected day', day) }}
      firstDay={1}
    />
    <Dropdown
      label={Translate.t('admin.calendar.labelDrop')}
      data={listOfCalendars}
    />
  </SafeAreaView>
);

const Header = () => (
  <View>
    <Text> { Translate.t('admin.calendar.header') }</Text>
  </View>
);
