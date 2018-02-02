import React, { Component} from 'react';
import { connect } from 'react-redux';
import { SplashScreen } from './screens/';

import { navigateTo } from '../../lib';

class SplashContainer extends Component{
	props: {
		isAuthenticated: boolean,
		navigation: Object,
	};

	componentDidMount(){
		const { auth, navigation } = this.props;
		
		navigateTo('Homepage', navigation);
	}

	render(){
		return (<SplashScreen />);
	}
}

const mapStateToProps = (state, action) => ({
	auth: state.auth.isAuthenticated
});

export const Splash = connect(mapStateToProps)(SplashContainer);
