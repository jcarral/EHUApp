import React, { Component, } from 'react';
import { Alert, } from 'react-native';

import { ResetPasswordScreen, } from './screens';
import { Translate, resetPassword, navigateTo, } from '../lib';

export class ResetPassword extends Component {
	constructor(){
		super();
		this.state = {
			email: '',
		};
	}

	handleChangeText = text => {
		this.setState({email: text});
	}

	handleResetPassword = async () => {
		try{
			const { navigation, } = this.props;
			await resetPassword(this.state.email);
			Alert.alert(Translate.t('auth.resetTitle'), Translate.t('auth.resetMssg'));
			navigateTo('AnonNavigator', navigation);
		}catch(error){
			Alert.alert(Translate.t('auth.resetTitle'), Translate.t('auth.resetMssgError'));
		}
	}

	render(){
		return (<ResetPasswordScreen handleChangeText={this.handleChangeText} handleResetPassword={this.handleResetPassword} />)
	}
}
