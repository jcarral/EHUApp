import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { colors } from '../../config';

export const HomepageScreen = () => (
	<SafeAreaView style={styles.safe}>
		<View style={styles.container}>
			<FormLabel>Email:</FormLabel>
			<FormInput />
			<FormLabel>Password</FormLabel>
			<FormInput secureTextEntry/>
			<Button title="Login" buttonStyle={styles.btnLogin}/>
			<Button title="SignUp" buttonStyle={styles.btnSign}/>
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
	btnLogin:{
		margin: 5,
		marginTop: 10,
		backgroundColor: colors.green
	},
	btnSign:{
		backgroundColor: colors.lightBlue,
		margin: 5
	}

});
