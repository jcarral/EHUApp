import React from 'react';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  NavigationActions,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import { colors } from '.';
// Screens
import {
  Splash,
  Homepage,
  Login,
  SignUp,
  ResetPassword,
} from '../auth';

import { Search } from '../search';

import { TeacherProfile } from '../teacher';

import { GradeProfile } from '../grade';

import { SubjectProfile } from '../subject';

import {
  UserProfile,
  UserEdit,
  UserPassword,
  UserSubscriptions,
} from '../user';

import { LanguagesSettings } from '../settings';
import { AdminPage, AdminCalendar } from '../admin';

const sharedRoutes = {
  SubjectProfile: {
    screen: SubjectProfile,
    navigationOptions: {
      header: null,
    },
  },
  GradeProfile: {
    screen: GradeProfile,
    navigationOptions: {
      header: null,
    },
  },
  TeacherProfile: {
    screen: TeacherProfile,
    navigationOptions: {
      header: null,
    },
  },
};

const SearchStackNavigator = StackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      header: null,
    },
  },
  ...sharedRoutes,
}, {
  headerMode: 'screen',
});


const HomeStackNavigator = StackNavigator({
  Home: {
    screen: Homepage,
    navigationOptions: {
      header: null,
    },
  },
  ...sharedRoutes,
}, {
  headerMode: 'screen',
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
  UserSubscriptions: {
    screen: UserSubscriptions,
    navigationOptions: {
      header: null,
    },
  },
});

const AdminStackNavigator = StackNavigator({
  AdminPage: {
    screen: AdminPage,
    navigationOptions: {
      header: null,
    },
  },
  AdminCalendar: {
    screen: AdminCalendar,
    navigationOptions: {
      header: null,
    },
  },
});

const AdminNavigator = TabNavigator(
  {
    Home: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            name="home"
            size={33}
          />
        ),
      },
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
        ),
      },
    },
    Admin: {
      screen: AdminStackNavigator,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            name="unlock-alt"
            type="font-awesome"
            size={33}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.white,
      inactiveTintColor: colors.grey,
      style: {
        backgroundColor: colors.black,
      },
    },
  },
);

const UserNavigator = TabNavigator(
  {
    Home: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            name="home"
            size={33}
          />
        ),
      },
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
        ),
      },
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            type="font-awesome"
            name="user"
            size={33}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.white,
      inactiveTintColor: colors.grey,
      style: {
        backgroundColor: colors.black,
      },
    },
    tabBarComponent: ({ jumpToIndex, ...props }) => (
      <TabBarBottom
        {...props}
        jumpToIndex={(index) => {
          const { dispatch, state } = props.navigation;

          if (state.index === index && state.routes[index].routes.length > 1) {
            const stackRouteName = [
              'UserProfile',
              'Search',
              'UserProfile',
            ][index];

            dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: stackRouteName }),
                ],
              }));
          } else {
            jumpToIndex(index);
          }
        }}
      />
    ),
  },
);

const AnonNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      headerStyle: { backgroundColor: colors.black },
      headerTintColor: colors.white,
    },
  },
});


const EHUApp = StackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    },
  },
  AnonNavigator: {
    screen: AnonNavigator,
    navigationOptions: {
      header: null,
    },
  },
  UserNavigator: {
    screen: UserNavigator,
    navigationOptions: {
      header: null,
    },
  },
  AdminNavigator: {
    screen: AdminNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

module.exports = EHUApp;
