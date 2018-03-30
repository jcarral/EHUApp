import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

import { colors } from '../../config';
import { Translate } from '../../lib';

//Pantalla que se muestra al cargar la app
export const SplashScreen = () => (
	<View style={styles.container}>
		<Image style={{ width: 100, height: 100 }} source={require('../../assets/images/logo-ehu-white.png')}/>
		<Text style={styles.title}> {Translate.t('auth.splash.title')} </Text>
		<Text style={styles.footerTxt}> { Translate.t('auth.splash.mssg') }</Text>
	</View>
);


const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 30,
		...Platform.select({
			ios: { fontFamily: 'Arial' },
			android: { fontFamily: 'Roboto' }
		})
	},
	footerTxt : {
		color: colors.white,
		fontSize: 16
	}
});
