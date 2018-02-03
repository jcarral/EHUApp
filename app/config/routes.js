import React from 'react';
import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import { colors } from '.';
//Screens
import {
	Splash,
	Homepage
} from '../components/auth';

import {
	Search
} from '../components/search';

const AnonNavigator = TabNavigator({
	Home: {
		screen: Homepage,
		navigationOptions: {
			header: null,
			tabBarIcon: ({tintColor}) => (
				<Icon
					containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
					color={tintColor}
					name="home"
					size={33}
				/>
			)
		}
	},
	Search: {
		screen: Search,
		navigationOptions: {
			header: null,
			tabBarIcon: ({ tintColor }) => (
				<Icon
					containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
					color={tintColor}
					name="search"
					size={33}
				/>
			)
		}
	}
},
	{
		tabBarOptions: {
			showLabel: false,
			activeTintColor: colors.white,
			inactiveTintColor: colors.grey,
			style: {
				backgroundColor: colors.black
			}
		}
	});

const UserNavigator = TabNavigator({
	Home: {
		screen: Homepage,
		navigationOptions: {
			header: null
		}
	}
});


const EHUApp = StackNavigator({
	Splash: {
		screen: Splash,
		navigationOptions: {
			header: null,
		}
	}, 
	AnonNavigator: {
		screen: AnonNavigator,
		navigationOptions: {
			header: null
		}
	},
	UserNavigator: {
		screen: UserNavigator,
		navigationOptions: {
			header: null
		}
	}
});

module.exports = EHUApp;
