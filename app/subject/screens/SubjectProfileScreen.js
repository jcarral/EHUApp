import React from 'react';
import { ScrollView, View, SafeAreaView, ActivityIndicator, StyleSheet, FlatList, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { ButtonGroup, List, Text, ListItem, Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { Agenda } from 'react-native-calendars';
import Accordion from 'react-native-collapsible/Accordion';

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
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 10,
  },
  contentText: {
    fontSize: 13,
  },
  biblioRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
});

const createSectionList = (detail = {}) => {
  let list = [];
  if (detail.description) list = [...list, { title: 'description', content: detail.description }];
  if (detail.competences) list = [...list, { title: 'competences', content: detail.competences }];
  if (detail['ordinary_announcement']) list = [...list, { title: 'evaluation', content: detail['ordinary_announcement'] }];
  if (detail.bibliography) list = [...list, { title: 'bibliography', content: detail.bibliography }];
  return list;
};

const renderSectionTitle = section => (<View />);

const renderSectionHeader = section => (
  <CategoryDivider iconName='keyboard-arrow-down' title={Translate.t(`subject.profile.${section.title}`)} />
);

const renderSectionContent = (section = {}) => {
  if (typeof section.content === typeof 'string') {
    return (
      <View style={styles.content}>
        <Text styule={styles.contentText}>{section.content}</Text>
      </View>
    );
  } else if (typeof section.content === typeof []) {
    return (
      <View style={styles.content}>
        {
          section.content.map(item =>
          (
            <View style={[styles.biblioRow]}>
              <Text>{'\u2022'}</Text>
              <Text styule={styles.contentText}> {item}</Text>
            </View>
          ))
        }
      </View>
    );
  }
  return (<View />);
};

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
    {children}
    {
      selectedIndex === 2
      && <Agenda
        items={dates}
        renderItem={(item, firstItemInDay) => ((<DayItem day={item} />))}
        renderEmptyDate={() => <View />}
        rowHasChanged={(r1, r2) => r1.start !== r2.start}
        renderEmptyData={() => <EmptyData generateCalendar={generateCalendar} />}
        style={{ marginTop: -100 }}
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
        <Text style={styles.subtitle}>{subject.detail.degree || ''}</Text>
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
        <FlatList data={subject.summary.teachers || []} renderItem={({ item }) => <ListItem title={item.name} onPress={() => goToPath(item['id_teacher'], item['code_degree'])} />} />
      </List>
    </View>
  </View>
);

const SubjectDetail = ({ subject, accordionIndex }) => (
  <ScrollView>
    <Accordion
      sections={createSectionList(subject.detail)}
      renderSectionTitle={renderSectionTitle}
      renderHeader={renderSectionHeader}
      renderContent={renderSectionContent}
    />
  </ScrollView>
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
