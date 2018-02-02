import React from 'react';
import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';

//Screens
import {
	Splash,
	Homepage
} from '../components/auth';

const EHUApp = StackNavigator({
	Splash: {
		screen: Splash,
		navigationOptions: {
			header: null,
		}
	},
	Homepage: {
		screen: Homepage,
		navigationOptions: {
			header: null,
		},
	}
});

module.exports = EHUApp;
