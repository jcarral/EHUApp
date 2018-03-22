import React, { Component} from 'react';
import { connect } from 'react-redux';
import { SplashScreen } from './screens/';

import { navigateTo, wait } from '../lib';
import { getUser } from '.';

class SplashContainer extends Component{
	props: {
		isAuthenticated: boolean,
		navigation: Object,
	};

	componentWillMount = () => {
    this.props.dispatch(getUser());
  }

  componentWillReceiveProps = async (newProps) => {
    const { isAuthenticated, navigation } = newProps;
    await wait(500);
    if (isAuthenticated) navigateTo('UserNavigator', navigation);
    else navigateTo('AnonNavigator', navigation);
  }

	render(){
		return (<SplashScreen />);
	}
}

const mapStateToProps = (state, action) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export const Splash = connect(mapStateToProps)(SplashContainer);
