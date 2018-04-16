import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

import { SignUpScreen } from './screens';
import { Helper, navigateTo, Translate } from '../lib';
import { signup } from '.';

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password2: '',
      name: '',
      surname: '',
    };
  }

  componentWillReceiveProps = () => {
    const { isAuthenticated, navigation, user } = this.props;
    if (isAuthenticated && user.role !== 'admin') navigateTo('UserNavigator', navigation);
    else if (isAuthenticated) navigateTo('AdminNavigator', navigation);
    else navigateTo('AnonNavigator', navigation);
  }

  handleChangeText = (text, type) => {
    const propObject = {};
    propObject[type] = text;
    this.setState(Object.assign({}, this.state, propObject));
  }

  handleSignUp = () => {
    const { email, password, password2 } = this.state;
    if (!Helper.isValidPassword(password, password2) || !Helper.isEmailValid(email)) {
      Alert.alert(Translate.t('auth.signup.errorTitle'), Translate.t('auth.signup.errorMessage'));
      this.setState({ email: '', password: '', password2: '' });
    } else {
      this.props.dispatch(signup(this.state));
    }
  }

  render() {
    const {
      email, password, password2, name, surname,
    } = this.state;
    const values = {
      email,
      password,
      password2,
      name,
      surname,
    };

    return (
      <SignUpScreen
        values={values}
        handleChangeText={this.handleChangeText}
        handleSignUp={this.handleSignUp}
      />);
  }
}
const mapsStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export const SignUp = connect(mapsStateToProps)(SignUpPage);
