import React, { Component} from 'react';
import { connect } from 'react-redux';
import { SplashScreen } from './screens/';

import { navigateTo, wait } from '../../lib';

class SplashContainer extends Component{
	props: {
		isAuthenticated: boolean,
		navigation: Object,
	};

	async componentDidMount(){
		const { auth, navigation } = this.props;
		await wait(1000);
		navigateTo('AnonNavigator', navigation);
	}

	render(){
		return (<SplashScreen />);
	}
}

const mapStateToProps = (state, action) => ({
	auth: state.auth.isAuthenticated
});

export const Splash = connect(mapStateToProps)(SplashContainer);
