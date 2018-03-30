import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { Icon, Avatar, List, ListItem } from 'react-native-elements';

import { EmptyList } from '../../components';
import { colors } from '../../config';
import { sortByDate, Translate } from '../../lib';

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

export const TeacherProfileScreen = ({ searching, data, error }) => (
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
        && <TeacherView data={data} />
      }
    </View>
  </SafeAreaView>
);

const TeacherView = ({ data }) => (
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
      </View>
    </View>
    {
      data
      && data.schedule
      && data.schedule.length > 0
      &&
      <TeacherSchedule schedule={data.schedule} />
    }
  </View>
);

const TeacherSchedule = ({ schedule }) => {
  const sortSchedule = sortByDate(schedule);
  const next = sortSchedule.shift();

  if (!next) return (<EmptyList title={Translate.t('teacher.profile.noTutorships')} />);

  return (
    <View style={styles.scheduleContainer}>
      <View style={styles.nextTutorship}>
        <Text> {Translate.t('teacher.profile.nextTutorship')} </Text>
        <Text style={styles.nextTutorshipTxt}> {next['date-start'] || Translate.t('teacher.profile.noMore')}  </Text>
      </View>
      {
        schedule.length > 0 &&
        (
          <View>
            <List>
              <FlatList data={sortSchedule} renderItem={({ item }) => (<ListItem rightIcon={(<Icon name="perm-contact-calendar" />)} title={item['date-start']} subtitle={item['date-end']} />)} />
            </List>
          </View>
        )
      }
      {
        schedule.length === 0
        && (<EmptyList title={Translate.t('teacher.profile.noTutorships')} />)
      }
    </View>
  );
};

const NoTutorships = () => (
  <View>
    <Text> {Translate.t('teacher.profile.noTutorships')} </Text>
  </View>
);
