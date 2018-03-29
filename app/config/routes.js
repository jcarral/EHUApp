import React from 'react';
import {
	StackNavigator,
  TabNavigator,
  TabBarBottom,
  NavigationActions,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import { colors } from '.';
//Screens
import {
	Splash,
  Homepage,
  Login, 
  SignUp
} from '../auth';

import {
	Search
} from '../search';

import { 
	TeacherProfile
} from '../teacher';

import {
	GradeProfile
} from '../grade';

import {
	SubjectProfile
} from '../subject';

import {
  UserProfile,
	UserEdit,
	UserPassword,
} from '../user';

import {
 LanguagesSettings,
} from '../settings';

const sharedRoutes = {
	SubjectProfile : {
		screen: SubjectProfile,
		navigationOptions: {
			header: null,
		}
	},
	GradeProfile : {
		screen: GradeProfile,
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

const ProfileStackNavigator = StackNavigator({
 UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      header: null,
    },
  },
  Languages: {
    screen: LanguagesSettings,
    navigationOptions: {
      header: null,
    },
  },
  UserEdit: {
    screen: UserEdit,
    navigationOptions: {
      header: null,
    },
	},
	UserPassword: {
		screen: UserPassword,
		navigationOptions: {
			header: null,
		},
	},
});

const UserNavigator = TabNavigator({
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
  },
  Profile: {
    screen: ProfileStackNavigator,
    navigationOptions : {
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          color={tintColor}
          type='font-awesome'
          name='user'
          size={33}
        />
      ),
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
			},
    },
    tabBarComponent: ({ jumpToIndex, ...props }) => (
      <TabBarBottom
        {...props}
        jumpToIndex={index => {
          const { dispatch, state } = props.navigation;

          if (state.index === index && state.routes[index].routes.length > 1) {
            console.log('index', index);
            const stackRouteName = [
              'Home',
              'Search',
              'UserProfile',
            ][index];

            dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: stackRouteName }),
                ],
              })
            );
          } else {
            jumpToIndex(index);
          }
        }}
      />
    ),
	});

const AnonNavigator = TabNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			header: null,
		},
  },
  SignUp : {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
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
