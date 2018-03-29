import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import { UserPasswordScreen } from './screens';
import { Helper, Translate, navigateTo, } from '../lib';
import { updatePassword } from './user.action';

class UserPasswordPage extends Component {

	constructor(){
		super();
		this.state = {
			actual: '',
			next: '',
			nextRepeat: '',
		};
	}

	handleChangeText = (text, prop) => {
		let tmpState = Object.assign({}, this.state);
		tmpState[prop] = text;
		this.setState(tmpState);
	}

	handleUpdatePassword = async () => {
		const { actual, next, nextRepeat, } = this.state;
		const { dispatchUpdatePassword, navigation, role, email, } = this.props;
		if (next !== nextRepeat) return Alert.alert(Translate.t('user.password.alertTitle'), Translate.t('user.password.alertSamePassword'));
		else if (!Helper.isValidPassword(next, nextRepeat)) return Alert.alert(Translate.t('user.password.alertTitle'), Translate.t('user.password.alertShortPassword'));
		else {
			const updated = await dispatchUpdatePassword(email, actual, next);
			if (updated && role !== 'admin') navigateTo('UserNavigator', navigation);
			else if (updated) navigateTo('AdminNavigator', navigation);
		}
	}
	
	componentWillReceiveProps = nextProps => {
		const { error, } = nextProps;
		if (typeof error !== typeof 'string' || error.length > 0) return Alert.alert(Translate.t('user.password.alertTitle'), Translate.t('user.password.alertWrongPassword'));
	}

	render(){
		return (<UserPasswordScreen 
			values={this.state} 
			handleChangeText={this.handleChangeText} 
			handleUpdatePassword={this.handleUpdatePassword}
		/>)
	}
}

const mapStateToProps = (state, action) => ({
	error: state.profile.error,
	role: state.auth.user.role,
	email: state.auth.user.email,
});

const mapDispatchToProps = dispatch => ({
	dispatchUpdatePassword: (email, actual, next) => dispatch(updatePassword(email, actual, next)),
});

export const UserPassword = connect(mapStateToProps, mapDispatchToProps)(UserPasswordPage);
