import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

import { SignUpScreen } from './screens';
import { Helper, navigateTo } from '../lib';
import { signup } from '.';
import { Translate } from '../lib';

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

  handleChangeText = (text, type) => {
    let propObject = {};
    propObject[type] = text;
    this.setState(Object.assign({}, this.state, propObject));
  }

  handleSignUp = () => {
    const { email, password, password2 } = this.state;
    if( !Helper.isValidPassword(password, password2) || !Helper.isEmailValid(email)){
      Alert.alert(Translate.t('auth.signup.errorTitle'), Translate.t('auth.signup.errorMessage'));
      this.setState({email: '', password: '', password2: ''});
    }else{
      this.props.dispatch(signup(this.state));
    }
  }

  componentWillReceiveProps = () => {
    const { isAuthenticated, navigation } = this.props;
    if (isAuthenticated) navigateTo('UserNavigator', navigation);
    else navigateTo('AnonNavigator', navigation);
  }

  render() {
    const { email, password, password2, name, surname } = this.state;
    const values = {
      email,
      password,
      password2,
      name,
      surname,
    };

    return (<SignUpScreen values={values} handleChangeText={this.handleChangeText} handleSignUp={this.handleSignUp} />);
  }
}
const mapsStateToProps = (state, action) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export const SignUp = connect(mapsStateToProps)(SignUpPage);
