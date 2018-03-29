import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { colors } from '../../config';
import { Translate } from '../../lib';

export const HomepageScreen = ({signOut}) => (
	<SafeAreaView style={styles.safe}>
		<View style={styles.container}>
		</View>
	</SafeAreaView>
);

const styles = StyleSheet.create({
	safe: {
		backgroundColor: colors.white,
		flex: 1,
	},
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'center'
	},
	btnSign:{
		backgroundColor: colors.red,
		margin: 5
	}

});
