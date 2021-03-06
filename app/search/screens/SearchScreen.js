import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Icon, SearchBar, ButtonGroup, List, ListItem } from 'react-native-elements';

import { EmptyList } from '../../components/';
import { colors } from '../../config';
import { Translate } from '../../lib';

const T_DEGREE = 0;
const T_SUBJECTS = 1;
const T_TEACHERS = 2;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.black,
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

const DegreeItem = ({
  name, code, goToPath, index,
}) => (
  <ListItem
    title={name}
    onPressRightIcon={() => goToPath('DegreeProfile', index)}
  />
);

const SubjectItem = ({
  name, degreeName, code, goToPath, index,
}) => (
  <ListItem
    title={name}
    subtitle={degreeName}
    onPressRightIcon={() => goToPath('SubjectProfile', index)}
  />
);

const TeacherItem = ({
  name, degreeName, code, goToPath, index,
}) => (
  <ListItem
    title={name}
    subtitle={degreeName}
    onPressRightIcon={() => goToPath('TeacherProfile', index)}
  />
);

const LoadingList = () => (
  <View>
    <ActivityIndicator size="large" color={colors.black} />
  </View>
);

export const SearchScreen = ({
  onChange,
  onFinish,
  updateIndex,
  buttons,
  selectedIndex,
  loading,
  degrees,
  subjects,
  teachers,
  goToPath,
}) => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <SearchBar onSubmitEditing={onFinish} onChangeText={onChange} />
      <ButtonGroup onPress={updateIndex} buttons={buttons} selectedIndex={selectedIndex} />
      {
        loading &&
        (<LoadingList />)
      }
      {
        !loading
        && selectedIndex === T_DEGREE
        && degrees.length === 0
        && <EmptyList title={Translate.t('search.emptyListDegrees')} />
      }
      {
        !loading
        && selectedIndex === T_SUBJECTS
        && subjects.length === 0
        && <EmptyList title={Translate.t('search.emptyListSubjects')} />
      }
      {
        !loading
        && selectedIndex === T_TEACHERS
        && teachers.length === 0
        && <EmptyList title={Translate.t('search.emptyListTeachers')} />
      }
      {
        !loading
        && selectedIndex === T_DEGREE
        &&
        <List>
          <FlatList
            data={degrees}
            renderItem={({ item, index }) => (
              <DegreeItem
                goToPath={goToPath}
                name={item.name}
                code={item.code}
                index={index}
              />
            )}
          />
        </List>
      }
      {
        !loading
        && selectedIndex === T_SUBJECTS
        &&
        <List>
          <FlatList
            data={subjects}
            renderItem={({ item, index }) => (
              <SubjectItem
                goToPath={goToPath}
                name={item.name}
                degreeName={item.degreeName}
                index={index}
                code={item.code}
              />)}
          />
        </List>
      }
      {
        !loading
        && selectedIndex === T_TEACHERS
        &&
        <List>
          <FlatList
            data={teachers}
            renderItem={({ item, index }) => (
              <TeacherItem
                goToPath={goToPath}
                name={item.name}
                degreeName={item.degreeName}
                index={index}
                code={item.code}
              />)}
          />
        </List>
      }

    </View>
  </SafeAreaView>
);
