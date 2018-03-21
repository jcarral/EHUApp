import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors } from '../config';

export const CategoryDivider = ({ iconName, title, color = colors.black, onPress }) => (
	<View style={[styles.container]}> 
		<View>
			<Text style={[styles.title]}> {title} </Text>
		</View>
		<View style={[styles.leftIcon]}>
			<Icon name={iconName} color={colors.lightGrey} onPress={onPress}/>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection : 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.darkGrey
	},
	leftIcon: {
		backgroundColor: colors.black,
		padding: 15
	},
	title: {
		color: colors.lightGrey,
		fontWeight: 'bold',
		fontSize: 18,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
	}
});
