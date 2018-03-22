import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoginScreen } from './screens';
import { login } from '.';
import { navigateTo } from '../lib';

class LoginPage extends Component{
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChangeInput = (text, type) => {
    if (type === 'password') this.setState({password: text});
    else this.setState({email: text});
  }
  
  handleLogin = () => {
    const { email, password } = this.state;
    this.props.dispatch(login({
      email,
      password,
    }));
  }

  componentWillReceiveProps = (newProps) => {
    const { isAuthenticated, navigation } = newProps;
    if (isAuthenticated) navigateTo('UserNavigator', navigation);
    else navigateTo('AnonNavigator', navigation);
  }

  render(){
    const { email, password } = this.state;
    return <LoginScreen handleLogin={this.handleLogin} handleChangeInput={this.handleChangeInput} values={{email, password}}/>;
  }
}

const mapStateToProps = (state, action) => ({
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
});

export const Login = connect(mapStateToProps)(LoginPage);
