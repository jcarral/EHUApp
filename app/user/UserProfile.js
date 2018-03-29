import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserProfileScreen } from './screens';
import { signOut } from '../auth';
import { navigateTo } from '../lib';

class UserPage extends Component {
  handleNavigation = path => {
    const { navigation } = this.props;
    navigation.navigate(path);
	}
	
	logout = async () => {
		const { logout, navigation, } = this.props;
		await logout();
		navigateTo('AnonNavigator', navigation);
	}

  render(){
    const { user, } = this.props;
    return <UserProfileScreen handleNavigation={ this.handleNavigation } user={user} handleLogout={this.logout}/>;
  }
}

const mapStateToProps = (state, action) => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
	logout : () => dispatch(signOut()),
});


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserPage);
