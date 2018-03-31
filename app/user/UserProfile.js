import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { UserProfileScreen } from './screens';
import { signOut } from '../auth';
import { navigateTo, Translate } from '../lib';
import { fetchProfile } from './user.action';

class UserPage extends Component {
  componentWillMount = () => {
    this.props.handleFetchProfile();
  }

  handleNavigation = (path) => {
    const { navigation } = this.props;
    navigation.navigate(path);
  }
  
  logout = async () => {
    const { logout, navigation } = this.props;
    Alert.alert(
      Translate.t('user.logoutAlert'),
      '',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await logout();
            navigateTo('AnonNavigator', navigation);
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { user } = this.props;
    console.log('user', user)
    return (
      <UserProfileScreen
        handleNavigation={this.handleNavigation}
        user={user}
        handleLogout={this.logout}
      />);
  }
}

const mapStateToProps = (state, action) => ({
  user: state.profile.data,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(signOut()),
  handleFetchProfile: () => dispatch(fetchProfile()),
});

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserPage);
