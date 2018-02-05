import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { Icon, Avatar, List, ListItem } from 'react-native-elements';

import { colors } from '../../config';
import { sortByDate } from '../../lib';

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
				&& (<View>
					<Text> Error </Text>
				</View>)
			}
			{
				!searching
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
				<Text style={styles.name}>{data.name}</Text>
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
			data.schedule 
			&&
			data.schedule.length > 0
			&&
			<TeacherSchedule schedule={data.schedule} />
		}
	</View>
);

const TeacherSchedule = ({schedule}) => {
	schedule = sortByDate(schedule);
	const next = schedule.shift();
	if (!next) return (<NoTutorships />);

	return (
		<View style={styles.scheduleContainer}>
			<View style={styles.nextTutorship}>
				<Text> Próxima tutoria: </Text>
				<Text style={styles.nextTutorshipTxt}> {next["date-start"] || 'No hay más tutorias'}  </Text>
			</View>
				{
					schedule.length > 0 &&
					(
					<View>
						<List>
							<FlatList data={schedule} renderItem={({ item }) => (<ListItem rightIcon={(<Icon name="perm-contact-calendar" />)} title={item['date-start']} subtitle={item['date-end']} />)} />
						</List>
					</View>
					)
				}
				{
					schedule.length === 0
					&& (<NoTutorships />)
				}
		</View>
	);
}

const NoTutorships = () => (
	<View>
		<Text> No hay tutorias </Text>
	</View>
);
const styles = StyleSheet.create({
	safe: {
		backgroundColor: colors.black,
		flex: 1
	},
	container: {
		backgroundColor: colors.white,
		flex: 1
	},
	header: {
		backgroundColor: colors.black,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	avatar: {
		padding: 10,
		backgroundColor: colors.lightGrey
	},
	name : {
		color: colors.lightGrey,
		fontSize: 20,
		fontWeight: 'bold',
		paddingTop: 5,
		paddingBottom: 5
	},
	email: {
		flexDirection : 'row',
		alignItems: 'center'
	},
	emailText: {
		color: colors.grey
	},
	scheduleContainer: {

	},
	nextTutorship: {
		backgroundColor: colors.darkGrey,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	nextTutorshipTxt : {
		color: colors.lightGrey,
		fontSize: 20,
		fontWeight: 'bold'
	},
	moreTutorships: {
		color: colors.black,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 25,
		paddingTop: 5,
	}
});


const getInitials = (fullname) => {
	if (fullname === '') return '';
	let initials = '';
	fullname = fullname.split(', ');
	let name = fullname[1].split(' ');
	for (const word of name) {
		initials += word.charAt(0);
	}
	initials += fullname[0].charAt(0);
	return initials.toUpperCase();
}

