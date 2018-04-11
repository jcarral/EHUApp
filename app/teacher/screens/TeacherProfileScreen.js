import React from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { Icon, Text, Avatar, List, ListItem, Button } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';

import { EmptyList } from '../../components';
import { colors } from '../../config';
import { sortByDate, Translate, Dates } from '../../lib';

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.black,
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    padding: 10,
    backgroundColor: colors.lightGrey,
  },
  name: {
    color: colors.lightGrey,
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    color: colors.grey,
  },
  scheduleContainer: {

  },
  nextTutorship: {
    backgroundColor: colors.darkGrey,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextTutorshipTxt: {
    color: colors.lightGrey,
    fontSize: 20,
    fontWeight: 'bold',
  },
  moreTutorships: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 5,
  },
  row: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  rowSpace: {
    height: 10,
  },
  rowContainer: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  rowEnd: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  rowTextSubTitle: {
    color: colors.lightGrey,
  },
  rowTextTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
  },
});

const getInitials = (completeName) => {
  if (completeName === '') return '';
  let initials = '';
  const fullname = completeName.split(', ');
  const name = fullname[1].split(' ');
  for (const word of name) {
    initials += word.charAt(0);
  }
  initials += fullname[0].charAt(0);
  return initials.toUpperCase();
};

export const TeacherProfileScreen = ({
  searching,
  data = {},
  error,
  handleToggleSubscription,
  following,
}) => {
  const parsedSchedule = (data && data.schedule) ? Dates.scheduleToCalendar(data.schedule) : {};
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {
          searching &&
          <View>
            <ActivityIndicator size="large" color={colors.black} />
          </View>
        }
        {
          !searching
          && error
          && !data
          && (
            <View>
              <Text> Error </Text>
            </View>)
        }
        {
          !searching
          && !error
          && data
          && <TeacherView
            data={data}
            handleToggleSubscription={handleToggleSubscription}
            following={following}
          />
        }
      </View>
      <Agenda
        items={parsedSchedule}
        renderItem={(item, first) => <CalendarRow item={item} />}
        renderEmptyDate={() => <View/>}
        rowHasChanged={(r1, r2) => r1.start !== r2.start}
        renderEmptyData={() => <EmptyData />}
      />

    </SafeAreaView>
  );
};

const TeacherView = ({ data, handleToggleSubscription, following }) => (
  <View>

    <View>
      <View style={styles.header}>
        <Avatar
          xlarge
          rounded
          title={getInitials(data.name || '')}
          containerStyle={styles.avatar}
        />
        <Text style={styles.name}>{data.name || ''}</Text>
        <View style={styles.email}>
          <Icon
            name="email"
            color={colors.darkGrey}
          />
          <Text style={styles.emailText}> {data.email} </Text>
        </View>
        <Icon
          name={following ? 'user-times' : 'user-plus'}
          type='font-awesome'
          raised
          color={following ? colors.red : colors.blue}
          onPress={() => handleToggleSubscription()}
        />
      </View>
    </View>  
  </View>
);

const CalendarRow = ({ item }) => (
    <View style={[styles.row]}>
      <View style={[styles.rowSpace]} />
      <View style={[styles.rowContainer]}>
        <Text style={[styles.rowTextTitle]}> {item.start} - {item.end} </Text>
        <Text style={[styles.rowTextSubTitle]}> {item.day} </Text>
      </View>
      <View style={[styles.rowEnd]} />
    </View>
  );

const EmptyData = () => (
  <View style={[styles.empty]}>
    <Text h4> {Translate.t('teacher.profile.noTutorships')} </Text>
  </View>
);
