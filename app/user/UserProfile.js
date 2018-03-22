import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserProfileScreen } from './screens';

class UserPage extends Component {
  navigateTo = path => {
    const { navigation } = this.props;
    navigation.navigate(path);
  }

  render(){
    return <UserProfileScreen navigateTo={ this.navigateTo }/>;
  }
}

const mapStateToProps = (state, action) => ({
  user: state.auth.user,
});


export const UserProfile = connect(mapStateToProps)(UserPage);
