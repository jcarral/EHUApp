import React from 'react';
import { ScrollView, View, Text, SafeAreaView, ActivityIndicator, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { ButtonGroup, List, ListItem, Icon } from 'react-native-elements';

import { CategoryDivider } from '../../components';
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
});

export const SubjectProfileScreen = ({
  subject,
  searching,
  error,
  changeTab,
  selectedIndex,
  goToPath,
  buttons,
  handleToggleSubscription,
  following,
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
          handleToggleSubscription={handleToggleSubscription}
          following={following}
        />
      }
    </View>
  </SafeAreaView>
);

const SubjectView = ({
  subject,
  changeTab,
  selectedIndex,
  goToPath,
  buttons,
  handleToggleSubscription,
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
        onPress={() => handleToggleSubscription()}
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
