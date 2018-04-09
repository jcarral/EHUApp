import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { UserProfileScreen } from './screens';
import { signOut } from '../auth';
import { navigateTo, Translate } from '../lib';
import { fetchProfile } from './user.action';

class UserPage extends Component {
  componentWillMount = async () => {
    const { user, fetchProfileAction, fetching } = this.props;
    if ((!user || Object.keys(user).length === 0) && !fetching) {
      await fetchProfileAction();
    }
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
  fetching: state.profile.fetching,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(signOut()),
  fetchProfileAction: () => dispatch(fetchProfile()),
});

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserPage);
