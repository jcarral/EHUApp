import React from 'react';
import { ScrollView, View, Text, SafeAreaView, ActivityIndicator, StyleSheet, FlatList, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { ButtonGroup, List, ListItem, Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { Agenda } from 'react-native-calendars';

import { CategoryDivider } from '../../components';
import { DayItem } from '../../calendar';
import { colors } from '../../config';
import { Translate } from '../../lib';

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
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    color: colors.lightGrey,
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.grey,
    fontSize: 15,
    paddingTop: 5,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    padding: 5,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 10,
    color: colors.black,
  },
  left: {
    justifyContent: 'flex-start',
  },
  infoContainer: {
    padding: 10,
  },
  infoText: {
    fontSize: 15,
    color: colors.darkGrey,
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
  },
});

export const SubjectProfileScreen = ({
  subject,
  searching,
  error,
  changeTab,
  selectedIndex,
  goToPath,
  buttons,
  handleToggleModal,
  following,
  children,
  dates = {},
  generateCalendar,
}) => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      {
        searching
        && <ActivityIndicator size="large" color={colors.black} />
      }
      {
        !searching
        && !error
        && subject
        &&
        <SubjectView
          subject={subject}
          changeTab={changeTab}
          selectedIndex={selectedIndex}
          goToPath={goToPath}
          buttons={buttons}
          handleToggleModal={handleToggleModal}
          following={following}
        />
      }
    </View>
    { children }
    {
      selectedIndex === 2
      && <Agenda
        items={dates}
        renderItem={(item, firstItemInDay) => ((<DayItem day={item} />))}
        renderEmptyDate={() => <View />}
        rowHasChanged={(r1, r2) => r1.start !== r2.start}
        renderEmptyData={() => <EmptyData generateCalendar={generateCalendar} />}
      />
    }
  </SafeAreaView>
);

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
const SubjectView = ({
  subject,
  changeTab,
  selectedIndex,
  goToPath,
  buttons,
  handleToggleModal,
  following,
}) => (
  <View>
    <View style={styles.header}>
      <Text style={styles.title}>{subject.detail.name || ''}</Text>
      <View style={[styles.rows]}>
        <Text style={styles.subtitle}>{subject.detail.grade || ''}</Text>
        <Text style={styles.subtitle}>{subject.detail.course || ''}</Text>
      </View>
      <Icon
        name={following ? 'user-times' : 'user-plus'}
        type='font-awesome'
        raised
        color={following ? colors.red : colors.blue}
        onPress={() => handleToggleModal()}
      />
    </View>
    <ButtonGroup buttons={buttons} onPress={changeTab} selectedIndex={selectedIndex} />
    {
      selectedIndex === 0
      && <SubjectSummary subject={subject} goToPath={goToPath} />
    }
    {
      selectedIndex === 1
      && <SubjectDetail subject={subject} />
    }
    
  </View>
);


const SubjectSummary = ({ subject, goToPath }) => (
  <View>
    <View style={styles.infoContainer}>
      <View style={[styles.row, styles.left]}>
        <Text style={[styles.bold]}>Nombre:</Text>
        <Text style={[styles.infoText]}>{subject.summary.name}</Text>
      </View>
      <View style={[styles.row, styles.left]}>
        <Text style={[styles.bold]}>Centro:</Text>
        <Text style={[styles.infoText]}>{subject.summary.school.name}</Text>
      </View>
      <View style={[styles.row, styles.left]}>
        <Text style={[styles.bold]}>Curso:</Text>
        <Text style={[styles.infoText]}>{subject.summary.year}</Text>
      </View>
      <View style={[styles.row, styles.left]}>
        <Text style={[styles.bold]}>Créditos:</Text>
        <Text style={[styles.infoText]}>{subject.summary.credits}</Text>
      </View>
    </View>
    <View>
      <View>
        <CategoryDivider iconName="school" title={Translate.t('subject.profile.teachers')} />
      </View>
      <List>
        <FlatList data={subject.summary.teachers || []} renderItem={({ item }) => <ListItem title={item.name} onPress={() => goToPath(item['id_teacher'], item['code_grade'])} />} />
      </List>
    </View>
  </View>
);

const SubjectDetail = ({ subject, accordionIndex }) => (
  <View>

    <View>
      <CategoryDivider iconName='keyboard-arrow-down' title={Translate.t('subject.profile.info')} />
      <View>
        <Text>
          Non Lorem elit qui proident ea et nulla enim adipisicing amet eiusmod.
          Consequat officia nostrud id consectetur magna ad nisi nostrud aliqua elit laborum.
          Nisi eiusmod nulla labore excepteur eu.
          Dolore Lorem irure nisi culpa laborum dolor.
          Lorem ut consectetur Lorem enim elit excepteur.
        </Text>
      </View>
    </View>
    <View>
      <CategoryDivider iconName='keyboard-arrow-down' title={Translate.t('subject.profile.competences')} />

    </View>
    <View>
      <CategoryDivider iconName='keyboard-arrow-down' title={Translate.t('subject.profile.eval')} />

    </View>
    <View>
      <CategoryDivider iconName='keyboard-arrow-down' title={Translate.t('subject.profile.biblio')} />

    </View>

  </View>
);

const addNewLine = text => text.replace('. ', '.\n');

export const SubscribeModal = ({
  groups,
  selectedGroup,
  handleChange,
  handleToggleSubscription,
  handleToggleModal,
}) => (
  <View style={[styles.modalContainer]}>
    <Dropdown
      label={Translate.t('subject.profile.modalTitle')}
      data={groups}
      value={selectedGroup}
      onChangeText={e => handleChange(e)}
    />
    <View style={[styles.modalButtons]}>
      <Button
        title={Translate.t('subject.profile.modalConfirm')}
        onPress={handleToggleSubscription}
        buttonStyle={[{ backgroundColor: colors.blue }]}
        containerViewStyle={[styles.modalBtn]}
      />
      <Button
        title={Translate.t('subject.profile.modalCancel')}
        onPress={handleToggleModal}
        buttonStyle={[{ backgroundColor: colors.red }]}
        containerViewStyle={[styles.modalBtn]}
      />
    </View>
  </View>
);
