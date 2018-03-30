import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Modal } from 'react-native';
import { ButtonGroup, ListItem, List, SearchBar, Card, Button, Icon } from 'react-native-elements';
import { CategoryDivider, EmptyList } from '../../components';
import { colors } from '../../config';
import { Translate } from '../../lib';

export const GradeProfileScreen = ({ 
		gradeData,
		teachers,
		subjects, 
		goToPath, 
		searching, 
		error, 
		changeTab, 
		selectedIndex, 
		buttons, 
		filterTeacher, 
		filterSubjects,
		modal
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
				&& (<GradeView 
							gradeData={gradeData} 
							teachers={teachers}
							subjects={subjects}
							selectedIndex={selectedIndex} 
							goToPath={goToPath} 
							buttons={buttons}
							changeTab={changeTab}
							filterTeacher={filterTeacher}
							filterSubjects={filterSubjects}
							modal={modal}
							/>)
			}
		</View>
	</SafeAreaView>
);

const GradeView = ({ 
	gradeData, 
	teachers, 
	subjects,
	selectedIndex, 
	goToPath, 
	buttons, 
	changeTab, 
	filterTeacher, 
	filterSubjects,
	modal
}) => (
	<View style={{flex:1}}>
		<GradeHeader name={gradeData.name} />
		<ButtonGroup buttons={buttons} selectedIndex={selectedIndex} onPress={changeTab}/>
		{
			selectedIndex === 0
			&& <SummaryView data={gradeData} modal={modal}/>
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

const GradeHeader = ({ name }) => (
	<View style={styles.header} >
		<Text style={styles.title}> { name } </Text>
	</View>
);

const TeachersView = ({ teachers, filterTeacher, goToPath}) => (
<View>
	<CategoryDivider iconName="school" title={Translate.t('grade.profile.teachers')} />
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
		&& <EmptyList title={Translate.t('grade.profile.emptyTeachersList')} />	
	}
</View>
);

const SummaryView = ({data, modal}) => (
	<ScrollView style={[styles.scroll]}>
		{
			data.summary
			&& (
			<View>
				<CategoryDivider iconName="assignment" title={Translate.t('grade.profile.summary')}/>
				<View style={styles.summaryContainer}>
					<SummaryModal data={data.summary} modal={modal}/>
				</View>
			</View>
			)
		}
		{
			data.contact
			&& (data.contact.address !== '' || data.contact.email !== '' ||  data.contact.phone !== '' )
			&& (
				<View>
					<CategoryDivider iconName="contacts" title={Translate.t('grade.profile.contact')} />
					<ContactView contact={data.contact} />
				</View>
			)
		}
	</ScrollView>
);

const SummaryModal = ({data, modal}) => (
<View style={{flex: 1}}>

			
			<Text> { data.substring(0, 240) + '...'} </Text>
			{
				data.length > 240
				&& (
				<Button
					onPress={() => modal.openModal()}
					title={Translate.t('grade.profile.openModal')}
					buttonStyle={styles.btnReadMore}
				/>
				)
			}
			<Modal
				transparent
				visible={modal.visible}
				animationType={'slide'}
				onRequestClose={() => modal.closeModal()}
				style={styles.modalContainer}
			>
				<Card title={Translate.t('grade.profile.cardTitle')}>
					<ScrollView style={styles.modalContent}>
						<Text>	{data} </Text>
					</ScrollView>
					<Button
						buttonStyle={{margin:10}}
						onPress={() => modal.closeModal()}
						title={Translate.t('grade.profile.closeBtn')}
					/>
				</Card>
			</Modal>
</View>
);

const ContactView = ({contact}) => (
	<View style={[styles.contact]} >

		{
			contact.name
			&& contact.name !== ''
			&& (
				<ListItem
					rightIcon={(<Icon name="perm-identity" />)}
					title={contact.name}
				/>
			)
		}
		{
			contact.email
			&& contact.email !== ''
			&& (
				<ListItem
					rightIcon={(<Icon name="email" />)}
					title={contact.email}
				/>
			)
		}

		{
			contact.phone
			&& contact.phone !== ''
			&& (
				<ListItem 
					rightIcon={(<Icon name="contact-phone" />)}
					title={contact.phone}
				/>
			)
		}
		
	
	</View>
);


const SubjectsView = ({ subjects, goToPath, filterSubjects}) => (
	<View>
		<CategoryDivider iconName="import-contacts" title={Translate.t('grade.profile.subjects')} />
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
      && <EmptyList title={Translate.t('grade.profile.emptySubjectsList')} />	
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
	},
	modalContainer: {
		
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnReadMore : {
		backgroundColor: colors.darkGrey,
		marginTop: 20
	},
	contact: {

	},
	row: {
		flexDirection: 'row'
	},
	modalContent: {
		maxHeight: 400
	}
});
