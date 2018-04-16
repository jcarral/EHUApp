import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, ListItem, List, Text, Icon } from 'react-native-elements';
import { Calendar, Agenda } from 'react-native-calendars';

import { safearea } from '../../assets';
import { Translate, Helper, Color, TextFormat } from '../../lib';
import { colors } from '../../config';

const styles = StyleSheet.create({
  holiday: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    backgroundColor: colors.lightGrey,
    // alignItems: 'center',
    justifyContent: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: colors.lightGrey,
  },
  hourText: {
    fontWeight: '700',
  },
  hourTextTime: {
    fontSize: 16,
  },
  hourColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginTop: 5,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const addOrMergeHour = (hour, sorted) => {
  // console.log('hour', hour)
  let found = false;
  for (const sortedHour of sorted) {
    if (sortedHour.start && sortedHour.end) {
      if (sortedHour.start === hour.start || sortedHour.end === hour.end) {
        sortedHour.type = [...sortedHour.type, hour.type];
        sortedHour.name = Helper.unique([...sortedHour.name, hour.name]);
        found = true;
      }
    }
  }
  if (!found) {
    sorted = [...sorted, {
      ...hour,
      type: [hour.type],
      name: [hour.name],
    }];
  }
  return sorted;
};

const sortHours = (hours) => {
  let sorted = [];
  for (const hour of hours) {
    sorted = addOrMergeHour(hour, sorted);
  }
  return sorted;
};

export const MyCalendarScreen = ({ dates, children, generateCalendar }) => (
  <SafeAreaView style={[safearea.container, safearea.whitesafe]}>
    <Agenda
      items={dates}
      renderItem={(item, firstItemInDay) => (<DayItem day={item} />)}
      renderEmptyDate={() => <View />}
      rowHasChanged={(r1, r2) => r1.start !== r2.start}
      renderEmptyData={() => <EmptyData generateCalendar={generateCalendar} />}
    />
  </SafeAreaView>
);

export const DayItem = ({ day }) => {
  if (!day || !day.type || day.type !== 'school') {
    return (<Holiday holiday={day} />);
  }
  const sortedHours = sortHours(day.hours)
    .sort((a, b) => ((a.start >= b.start) ? 1 : -1));

  return (
    <View style={[styles.day]}>
      <List>
        {
          sortedHours.map((l, i) => (
            <View
              key={i}
              style={
                [
                  {
                    backgroundColor: l.color.background,
                    // borderColor: Color.lighten(l.color.background, -0.1),
                  },
                 styles.hourContainer,
                ]
              }
            >
              <View>
                <View style={[styles.hourColumn]}>
                  <Text
                    style={
                      [
                        { color: l.color.text },
                        styles.hourText, styles.hourTextTime,
                      ]
                    }
                  > {l.start} - {l.end}:
                  </Text>
                </View>
                <View style={[styles.hourColumn]}>
                  { l.name.map((name, index) =>
                    (
                      <View key={index}>
                        <Text style={[{ color: l.color.text }, styles.hourText]}>
                          {name.name}
                        </Text>
                      </View>))
                  }
                </View>
              </View>
            </View>
          ))
        }
      </List>
    </View>
  );
};

const EmptyData = ({ generateCalendar }) => (
  <View style={[styles.empty]}>
    <Text h4> {Translate.t('calendar.empty')} </Text>
    <Icon
      name='loop'
      raised
      onPress={() => generateCalendar()}
    />
  </View>
);

const Holiday = ({ holiday }) => (
  <View style={[styles.holiday]}>
    <Text h4> {(holiday && holiday.name && holiday.name.length > 0) ? holiday.name : Translate.t('calendar.holiday')} {TextFormat.emojify(':tada:')}</Text>
  </View>
);
