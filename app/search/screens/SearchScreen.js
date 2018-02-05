import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Icon, SearchBar, ButtonGroup, List, ListItem } from 'react-native-elements';

import { colors } from '../../config';

const T_DEGREE = 0, T_SUBJECTS = 1, T_TEACHERS = 2;

const DegreeItem = ({ name, code, goToPath }) => (
	<ListItem 
		title={name}
		onPressRightIcon={() => goToPath('DegreeProfile', { name, code })}
	/>
);

const SubjectItem = ({ name, degreeName, code, goToPath }) => (
	<ListItem 
		title={name}
		subtitle={degreeName}
		onPressRightIcon={() => goToPath('SubjectProfile', { name, code } )}
	/>
);

const TeacherItem = ({ name, degreeName, code, goToPath }) => (
	<ListItem 
		title={name}
		subtitle={degreeName}
		onPressRightIcon={() => goToPath('TeacherProfile', { name, code } )}
	/>
);

const LoadingList = () => (
	<View>
		<ActivityIndicator size="large" color={colors.black} />
	</View>
);

const EmptyList = () => (
	<View>
		<Text> No hay resultados disponibles. </Text>
	</View>
);

export const SearchScreen = ({ onChange, onFinish, updateIndex, buttons, selectedIndex, loading, degrees, subjects, teachers, goToPath }) => (
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
				&& <EmptyList />
			}
			{
				!loading
				&& selectedIndex === T_SUBJECTS
				&& subjects.length === 0
				&& <EmptyList />
			}
			{
				!loading
				&& selectedIndex === T_TEACHERS
				&& teachers.length === 0
				&& <EmptyList />
			}
			{
				!loading
				&& selectedIndex === T_DEGREE
				&& <List><FlatList data={degrees} renderItem={({ item }) => (<DegreeItem goToPath={goToPath} name={item.name} code={item.code} />)} /></List>
			}
			{
				!loading
				&& selectedIndex === T_SUBJECTS
				&& <List><FlatList data={subjects} renderItem={({ item }) => (<SubjectItem goToPath={goToPath} name={item.name} degreeName={item.degreeName} code={item.code}/>)} /></List>
			}
			{
				!loading
				&& selectedIndex === T_TEACHERS
				&& <List><FlatList data={teachers} renderItem={({ item }) => (<TeacherItem goToPath={goToPath} name={item.name} degreeName={item.degreeName} code={item.code}/>)} /></List>
			}

		</View>
	</SafeAreaView>
);




const styles = StyleSheet.create({
	safe: {
		backgroundColor: colors.black,
		flex: 1
	},
	container: {
		backgroundColor: colors.white,
		flex: 1
	}
});
