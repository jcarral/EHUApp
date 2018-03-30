import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SplashScreen } from './screens/';

import { navigateTo, wait } from '../lib';
import { getUser } from '.';

class SplashContainer extends Component {
  componentWillMount = () => {
    this.props.dispatch(getUser());
  }

  componentWillReceiveProps = async (newProps) => {
    const {
      isAuthenticated, navigation, user,
    } = newProps;
    await wait(500);
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
});

export const Splash = connect(mapStateToProps)(SplashContainer);
