import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider, FormLabel, FormInput, Button, ButtonGroup } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-material-dropdown';
import { Translate, Dates, Helper } from '../../lib';
import { colors } from '../../config';
import { SectionListHeader } from '../../components';
import { safearea } from '../../assets';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    color: colors.white,
  },
});

export const AdminCalendarScreen = ({
  handleAddDate,
  listOfCalendars,
  handleChangeCalendar,
  selectedCalendar,
  selectedCalendarDates = {},
  handleNavigate,
  handleChangeText,
  selectedIndex = 0,
  buttons = [],
  values,
}) => {
  const markedDates = Dates.datesToComponent(selectedCalendarDates);
  return (
    <SafeAreaView style={[safearea.container, safearea.blackSafe]}>
      <ScrollView style={[styles.container]}>
        <SectionListHeader
          containerStyle={[styles.header]}
          textStyle={[styles.headerText]}
        >
          {Translate.t('admin.calendar.header')}
        </SectionListHeader>
        <Calendar
          onDayPress={day => handleAddDate(day)}
          firstDay={1}
          markingType='period'
          markedDates={markedDates}
        />
        <Divider style={{ backgroundColor: colors.lightGrey }} />
        <Dropdown
          label={Translate.t('admin.calendar.labelDrop')}
          data={listOfCalendars}
          value={selectedCalendar}
          onChangeText={e => handleChangeCalendar(e)}
        />
        <FormLabel> {Translate.t('admin.calendar.formLabel')} </FormLabel>
        <ButtonGroup
          onPress={index => handleChangeText('selectedIndex', index)}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
        {
          selectedIndex === 0
          &&
          <FormHolidayDate
            handleChangeText={handleChangeText}
            value={values.holidayText}
          />
        }
        {
          selectedIndex === 1
          && <FormWeekStartDate
            handleChangeText={handleChangeText}
            value={values.weekStartNumber}
          />
        }
        <Button
          title={Translate.t('admin.calendar.goToList')}
          onPress={() => handleNavigate()}
          iconRight={{ name: 'arrow-circle-right', type: 'font-awesome' }}
          backgroundColor={colors.blue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const FormHolidayDate = ({ handleChangeText, value }) => (
  <View>
    <FormLabel> {Translate.t('admin.calendar.holidayLabel')} </FormLabel>
    <FormInput
      value={value}
      onChangeText={text => handleChangeText('holidayText', text)}
      placeholder={Translate.t('admin.calendar.holidayPlaceholder')}
    />
  </View>
);

const FormWeekStartDate = ({ handleChangeText, value }) => (
  <View>
    <FormLabel>{ Translate.t('admin.calendar.weekStartLabel') }</FormLabel>
    <FormInput
      value={value.toString()}
      onChangeText={text => handleChangeText('weekStartNumber', (Helper.isNaN(text) ? 0 : parseInt(text, 10)))}
      keyboardType='numeric'
      placehoder={Translate.t('admin.calendar.weekStartPlaceholder')}
    />
  </View>
);
