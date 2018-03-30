import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoginScreen } from './screens';
import { login } from '.';
import { navigateTo } from '../lib';

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
    if (isAuthenticated && user.role !== 'admin') navigateTo('UserNavigator', navigation);
    else if (isAuthenticated) navigateTo('AdminNavigator', navigation);
    else navigateTo('AnonNavigator', navigation);
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
  handleNavigation = () => {
    const { navigation } = this.props;
    navigation.navigate('ResetPassword');
  }
  render() {
    const { email, password } = this.state;
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
