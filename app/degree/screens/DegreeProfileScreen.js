import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { ButtonGroup, ListItem, List, SearchBar } from 'react-native-elements';
import { CategoryDivider } from '../../components';

import { colors } from '../../config';

export const DegreeProfileScreen = ({ 
		degreeData,
		teachers,
		subjects, 
		goToPath, 
		searching, 
		error, 
		changeTab, 
		selectedIndex, 
		buttons, 
		filterTeacher, 
		filterSubjects
	}) => (
	<SafeAreaView style={styles.safe}>
		<View style={styles.container}>
			{
				searching
				&& (<ActivityIndicator xlarge />)
			}
			{
				!searching
				&& error
				&& <Text> Error ! </Text>
			}
			{
				!searching
				&& !error
				&& (<DegreeView 
							degreeData={degreeData} 
							teachers={teachers}
							subjects={subjects}
							selectedIndex={selectedIndex} 
							goToPath={goToPath} 
							buttons={buttons}
							changeTab={changeTab}
							filterTeacher={filterTeacher}
							filterSubjects={filterSubjects}
							/>)
			}
		</View>
	</SafeAreaView>
);

const DegreeView = ({ 
	degreeData, 
	teachers, 
	subjects,
	selectedIndex, 
	goToPath, 
	buttons, 
	changeTab, 
	filterTeacher, 
	filterSubjects
}) => (
	<View style={{flex:1}}>
		<DegreeHeader name={degreeData.name} />
		<ButtonGroup buttons={buttons} selectedIndex={selectedIndex} onPress={changeTab}/>
		{
			selectedIndex === 0
			&& <SummaryView data={degreeData}/>
		}
		{
			selectedIndex === 1
			&& <SubjectsView subjects={subjects} goToPath={goToPath} filterSubjects={filterSubjects}/>
		}
		{
			selectedIndex === 2
			&& <TeachersView teachers={teachers} goToPath={goToPath} filterTeacher={filterTeacher}/>
		}
	</View>
);

const DegreeHeader = ({ name }) => (
	<View style={styles.header} >
		<Text style={styles.title}> { name } </Text>
	</View>
);

const TeachersView = ({ teachers, filterTeacher, goToPath}) => (
<View>
	<CategoryDivider iconName="school" title="Profesores:" />
		<SearchBar containerStyle={{backgroundColor: colors.lightGrey}} inputStyle={{backgroundColor: colors.white}} onChangeText={filterTeacher} />
	{
		teachers
		&& Object.keys(teachers).length > 0
		&& (
				<List>
					<FlatList 
						data={Object.keys(teachers)} 
						renderItem={({ item }) => 
							(
							<ListItem 
								title={teachers[item]} 
								onPress={() => goToPath('TeacherProfile', item)} 
							/>
							)
						} 
					/>
				</List>
		)
	}
	{
			Object.keys(teachers).length === 0
		&& <Text> No hay profesores para este grado ! </Text>
	}
</View>
);

const SummaryView = ({data}) => (
	<ScrollView style={[styles.scroll]}>
		{
			data.summary
			&& (
			<View>
				<CategoryDivider iconName="assignment" title="Resumen"/>
				<View style={styles.summaryContainer}>
					<Text> { data.summary } </Text>
				</View>
			</View>
			)
		}
		{
			data.contact
			&& (
				<View>
					<CategoryDivider iconName="contacts" title="Contacto" />
					<Text> {data.contact.address} </Text>
				</View>
			)
		}
	</ScrollView>
);

const SubjectsView = ({ subjects, goToPath, filterSubjects}) => (
	<View>
		<CategoryDivider iconName="import-contacts" title="Asignaturas:" />
		<SearchBar containerStyle={{ backgroundColor: colors.lightGrey }} inputStyle={{ backgroundColor: colors.white }} onChangeText={filterSubjects} />
		{
			Object.keys(subjects).length > 0
			&& (
				<List>
					<FlatList 
						data={Object.keys(subjects)}
						renderItem={({item}) => (
							<ListItem 
								title={subjects[item]}
								onPress={() => goToPath('SubjectProfile', item)}
							/>
						)}
					/>
				</List>
			)
		}
		{
			Object.keys(subjects).length === 0
			&& (<Text> No hay asignaturas disponibles </Text>)
		}
	</View>
);

const styles = StyleSheet.create({
	safe: {
		backgroundColor: colors.black,
		flex: 1,
	},
	container : {
		backgroundColor: colors.white,
		flex: 1
	},
	header :{
		backgroundColor: colors.black,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 5,
		paddingRight: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		color: colors.lightGrey,
		textAlign: 'center'
	},
	scroll: {
		flex: 1
	},
	summaryContainer: {
		padding: 10
	}
});
