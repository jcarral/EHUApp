import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import { LoginScreen } from './screens';
import { LoadingScreen } from '../components';
import { login } from '.';
import { navigateTo, Translate } from '../lib';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps = (newProps) => {
    const { isAuthenticated, navigation, user } = newProps;
    if ('emailVerified' in user && user.emailverified) return Alert.alert(Translate.t('auth.login.alertTitle'), Translate.t('auth.login.alertMssg'));
    if (isAuthenticated && user.role !== 'admin') return navigateTo('UserNavigator', navigation);
    else if (isAuthenticated) return navigateTo('AdminNavigator', navigation);
    return navigateTo('AnonNavigator', navigation);
  }

  handleChangeInput = (text, type) => {
    if (type === 'password') this.setState({ password: text });
    else this.setState({ email: text });
  }

  handleLogin = () => {
    const { email, password } = this.state;
    this.props.dispatch(login({
      email,
      password,
    }));
  }

  handleNavigation = (path) => {
    const { navigation } = this.props;
    navigation.navigate(path);
  }

  render() {
    const { email, password } = this.state;
    const { isLoggingIn } = this.props;
    if (isLoggingIn) return (<LoadingScreen />);
    return (
      <LoginScreen
        handleNavigation={this.handleNavigation}
        handleLogin={this.handleLogin}
        handleChangeInput={this.handleChangeInput}
        values={{ email, password }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export const Login = connect(mapStateToProps)(LoginPage);
