import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { colors } from '../../config';

export const HomepageScreen = ({signOut}) => (
	<SafeAreaView style={styles.safe}>
		<View style={styles.container}>
			<Button title="Salir" buttonStyle={styles.btnSign} onPress={signOut}/>
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
