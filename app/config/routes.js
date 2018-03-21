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
} from '../auth';

import {
	Search
} from '../search';

import { 
	TeacherProfile
} from '../teacher';

import {
	DegreeProfile
} from '../degree';

import {
	SubjectProfile
} from '../subject';

const sharedRoutes = {
	SubjectProfile : {
		screen: SubjectProfile,
		navigationOptions: {
			header: null,
		}
	},
	DegreeProfile : {
		screen: DegreeProfile,
		navigationOptions: {
			header: null,
		}
	},
	TeacherProfile : {
		screen: TeacherProfile,
		navigationOptions: {
			header: null
		},
	}
};

const SearchStackNavigator = StackNavigator({
	Search: {
		screen: Search,
		navigationOptions: {
			header: null,
		}
	},
	...sharedRoutes
},{
	headerMode: 'screen'
});


const HomeStackNavigator = StackNavigator({
	Home: {
		screen: Homepage,
		navigationOptions: {
			header: null,
		}
	},
	...sharedRoutes
},{
	headerMode: 'screen'
});

const AnonNavigator = TabNavigator({
	Home: {
		screen: HomeStackNavigator,
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
		screen: SearchStackNavigator,
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
		tabBarPosition: 'bottom',
		tabBarOptions: {
			showIcon: true,
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
