import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Icon, SearchBar, ButtonGroup, List, ListItem } from 'react-native-elements';

import { EmptyList } from '../../components/';
import { colors } from '../../config';
import { Translate } from '../../lib';

const T_GRADE = 0;
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

const GradeItem = ({
  name, code, goToPath, index,
}) => (
  <ListItem
    title={name}
    onPressRightIcon={() => goToPath('GradeProfile', index)}
  />
);

const SubjectItem = ({
  name, gradeName, code, goToPath, index,
}) => (
  <ListItem
    title={name}
    subtitle={gradeName}
    onPressRightIcon={() => goToPath('SubjectProfile', index)}
  />
);

const TeacherItem = ({
  name, gradeName, code, goToPath, index,
}) => (
  <ListItem
    title={name}
    subtitle={gradeName}
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
  grades,
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
        && selectedIndex === T_GRADE
        && grades.length === 0
        && <EmptyList title={Translate.t('search.emptyListGrades')} />
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
        && selectedIndex === T_GRADE
        &&
        <List>
          <FlatList
            data={grades}
            renderItem={({ item, index }) => (
              <GradeItem
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
                gradeName={item.gradeName}
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
                gradeName={item.gradeName}
                index={index}
                code={item.code}
              />)}
          />
        </List>
      }

    </View>
  </SafeAreaView>
);
