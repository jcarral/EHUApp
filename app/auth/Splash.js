import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SplashScreen } from './screens/';

import { navigateTo, wait } from '../lib';
import { getUser } from '.';
import { fetchProfile } from '../user';

class SplashContainer extends Component {
  componentWillMount = async () => {
    const { getUserAction } = this.props;
    await getUserAction();
  }

  componentWillReceiveProps = async (newProps) => {
    const {
      isAuthenticated, navigation, user, fetchProfileAction, fetching, profile,
    } = newProps;
    await wait(500);
    if ((!profile || Object.keys(profile).length === 0) && !fetching) {
      await fetchProfileAction();
    }
    if (isAuthenticated && user.role !== 'admin') navigateTo('UserNavigator', navigation);
    else if (isAuthenticated) navigateTo('AdminNavigator', navigation);
    else navigateTo('AnonNavigator', navigation);
  }

  render() {
    return (<SplashScreen />);
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  locale: state.settings.locale,
  fetching: state.profile.fetching,
  profile: state.profile.data,
});

const mapDispatchToProps = dispatch => ({
  fetchProfileAction: () => dispatch(fetchProfile()),
  getUserAction: () => dispatch(getUser()),
});

export const Splash = connect(mapStateToProps, mapDispatchToProps)(SplashContainer);
